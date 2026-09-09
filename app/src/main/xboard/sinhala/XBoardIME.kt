package app.src.main.xboard.sinhala

import android.inputmethodservice.InputMethodService
import android.view.KeyEvent
import android.view.View
import android.view.inputmethod.EditorInfo
import android.view.inputmethod.InputConnection
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast

/**
 * X Board Keyboard Service
 * Android 8.0+ (API 26+) Compatible English Keyboard Engine
 *
 * Color Palette:
 * - Very Dark Gray (#121214 / #202026)
 * - Black (#000000)
 * - White (#FFFFFF)
 * - Neon Green (#07F57E)
 */
class XBoardIME : InputMethodService() {

    // Shift States
    enum class ShiftState {
        LOWERCASE,          // Simple letters (a-z)
        FIRST_LETTER_UPPER, // 1 click: First letter only uppercase, then reverts to lowercase
        CAPS_LOCKED         // Double click: All uppercase locked (A-Z)
    }

    private lateinit var rootView: View
    private lateinit var keysLayout: View
    private lateinit var toolPanelContainer: View
    private lateinit var toolPanelTitle: TextView
    private lateinit var spaceButton: Button
    private lateinit var enterButton: Button
    private lateinit var shiftButton: Button
    private lateinit var suggestionsLayout: LinearLayout

    private var shiftState: ShiftState = ShiftState.LOWERCASE
    private var lastShiftPressTime: Long = 0L
    private val DOUBLE_TAP_TIMEOUT = 300L

    private var activeFontId: String = "normal"
    private var isSoundEnabled: Boolean = true
    private var isHapticsEnabled: Boolean = true

    private lateinit var soundManager: SoundHapticManager
    private lateinit var dictionary: WordDictionary
    private val clipboardHistory = mutableListOf<String>()

    override fun onCreate() {
        super.onCreate()
        soundManager = SoundHapticManager(this)
        dictionary = WordDictionary(this)
    }

    override fun onCreateInputView(): View {
        rootView = layoutInflater.inflate(R.layout.keyboard_view, null)
        initViews(rootView)
        setupKeyboardControls()
        updateShiftStateUI()
        return rootView
    }

    override fun onStartInputView(info: EditorInfo?, restarting: Boolean) {
        super.onStartInputView(info, restarting)
        updateEnterButtonState(info)
        updateSuggestions()
    }

    private fun initViews(view: View) {
        keysLayout = view.findViewById(R.id.keyboard_keys_layout)
        toolPanelContainer = view.findViewById(R.id.tool_panel_container)
        toolPanelTitle = view.findViewById(R.id.tool_panel_title)
        spaceButton = view.findViewById(R.id.btn_key_space)
        enterButton = view.findViewById(R.id.btn_key_enter)
        shiftButton = view.findViewById(R.id.btn_key_shift)
        suggestionsLayout = view.findViewById(R.id.suggestions_bar)

        // Space button label explicitly: "X Board"
        spaceButton.text = "X Board"
    }

    private fun setupKeyboardControls() {
        // Shift button handler
        shiftButton.setOnClickListener {
            val currentTime = System.currentTimeMillis()
            soundManager.playKeyClick(SoundHapticManager.KEY_TYPE_ACTION)

            if (currentTime - lastShiftPressTime < DOUBLE_TAP_TIMEOUT) {
                // Double click -> Uppercase Lock (Caps Lock)
                shiftState = if (shiftState == ShiftState.CAPS_LOCKED) ShiftState.LOWERCASE else ShiftState.CAPS_LOCKED
            } else {
                // 1 click -> First letter uppercase only (or toggle off if active)
                shiftState = when (shiftState) {
                    ShiftState.LOWERCASE -> ShiftState.FIRST_LETTER_UPPER
                    ShiftState.FIRST_LETTER_UPPER -> ShiftState.LOWERCASE
                    ShiftState.CAPS_LOCKED -> ShiftState.LOWERCASE
                }
            }

            lastShiftPressTime = currentTime
            updateShiftStateUI()
        }

        // Space key
        spaceButton.setOnClickListener {
            commitText(" ")
            soundManager.playKeyClick(SoundHapticManager.KEY_TYPE_SPACE)
        }

        // Dedicated Emoji quick button
        rootView.findViewById<Button>(R.id.btn_key_emoji)?.setOnClickListener {
            soundManager.playKeyClick(SoundHapticManager.KEY_TYPE_ACTION)
            openToolPanel("emoji", "Emoji & Emoticon Picker")
        }

        // Comma key
        rootView.findViewById<Button>(R.id.btn_key_comma)?.setOnClickListener {
            commitText(",")
            soundManager.playKeyClick(SoundHapticManager.KEY_TYPE_CHAR)
        }

        // Period key
        rootView.findViewById<Button>(R.id.btn_key_period)?.setOnClickListener {
            commitText(".")
            soundManager.playKeyClick(SoundHapticManager.KEY_TYPE_CHAR)
        }

        // Enter key (newline or context action send/search/go)
        enterButton.setOnClickListener {
            val ic = currentInputConnection ?: return@setOnClickListener
            soundManager.playKeyClick(SoundHapticManager.KEY_TYPE_ENTER)
            val action = currentInputEditorInfo.imeOptions and EditorInfo.IME_MASK_ACTION

            when (action) {
                EditorInfo.IME_ACTION_SEND,
                EditorInfo.IME_ACTION_GO,
                EditorInfo.IME_ACTION_SEARCH,
                EditorInfo.IME_ACTION_DONE -> {
                    ic.performEditorAction(action)
                }
                else -> {
                    ic.commitText("\n", 1)
                }
            }
        }
    }

    /**
     * Character typed (A-Z, numbers, symbols)
     */
    fun onCharacterTyped(char: Char) {
        val ic = currentInputConnection ?: return
        val isUpper = shiftState != ShiftState.LOWERCASE
        val targetChar = if (isUpper) char.uppercaseChar() else char.lowercaseChar()

        // Convert with active 24 Unicode Fancy Font
        val output = FontConverter.convertText(targetChar.toString(), activeFontId)
        ic.commitText(output, 1)

        soundManager.playKeyClick(SoundHapticManager.KEY_TYPE_CHAR)
        dictionary.recordTypedWord(output)

        // If 1-click first letter uppercase was active, automatically revert to lowercase
        if (shiftState == ShiftState.FIRST_LETTER_UPPER) {
            shiftState = ShiftState.LOWERCASE
            updateShiftStateUI()
        }

        updateSuggestions()
    }

    /**
     * Backspace
     */
    fun onBackspacePressed() {
        val ic = currentInputConnection ?: return
        soundManager.playKeyClick(SoundHapticManager.KEY_TYPE_BACKSPACE)

        val selectedText = ic.getSelectedText(0)
        if (selectedText != null && selectedText.isNotEmpty()) {
            // Select all + backspace clear
            ic.commitText("", 1)
        } else {
            ic.deleteSurroundingText(1, 0)
        }
        updateSuggestions()
    }

    /**
     * Select All + Backspace Clear
     */
    fun onSelectAllAndClear() {
        val ic = currentInputConnection ?: return
        ic.performContextMenuAction(android.R.id.selectAll)
        ic.commitText("", 1)
    }

    /**
     * Select All
     */
    fun onSelectAll() {
        val ic = currentInputConnection ?: return
        ic.performContextMenuAction(android.R.id.selectAll)
    }

    /**
     * Copy selected text to clipboard history
     */
    fun onCopy() {
        val ic = currentInputConnection ?: return
        val text = ic.getSelectedText(0)?.toString() ?: ""
        if (text.isNotEmpty()) {
            clipboardHistory.add(0, text)
            ic.performContextMenuAction(android.R.id.copy)
            Toast.makeText(this, "Copied to clipboard", Toast.LENGTH_SHORT).show()
        }
    }

    /**
     * Cut selected text
     */
    fun onCut() {
        val ic = currentInputConnection ?: return
        val text = ic.getSelectedText(0)?.toString() ?: ""
        if (text.isNotEmpty()) {
            clipboardHistory.add(0, text)
            ic.performContextMenuAction(android.R.id.cut)
        }
    }

    /**
     * Paste from clipboard
     */
    fun onPaste() {
        val ic = currentInputConnection ?: return
        ic.performContextMenuAction(android.R.id.paste)
    }

    /**
     * Direct text insertion (used for 20 Text Decoration styles & Emojis)
     */
    fun onInsertDecoratedText(text: String) {
        val ic = currentInputConnection ?: return
        ic.commitText(text, 1)
        soundManager.playKeyClick(SoundHapticManager.KEY_TYPE_CHAR)
        closeToolPanel()
    }

    /**
     * Font selected: User chooses font and can return to type
     */
    fun onFontSelected(fontId: String) {
        activeFontId = fontId
        closeToolPanel()
    }

    /**
     * Tool Panel View Switch: Hides letter keys and displays tool panel
     */
    fun openToolPanel(panelType: String, title: String) {
        keysLayout.visibility = View.GONE
        toolPanelContainer.visibility = View.VISIBLE
        toolPanelTitle.text = title
    }

    fun closeToolPanel() {
        toolPanelContainer.visibility = View.GONE
        keysLayout.visibility = View.VISIBLE
    }

    private fun commitText(text: String) {
        val ic = currentInputConnection ?: return
        ic.commitText(text, 1)
        dictionary.recordTypedWord(text)
    }

    private fun updateShiftStateUI() {
        when (shiftState) {
            ShiftState.LOWERCASE -> {
                shiftButton.text = "⇧"
                shiftButton.alpha = 0.85f
            }
            ShiftState.FIRST_LETTER_UPPER -> {
                shiftButton.text = "⇪"
                shiftButton.alpha = 1.0f
            }
            ShiftState.CAPS_LOCKED -> {
                shiftButton.text = "🔒"
                shiftButton.alpha = 1.0f
            }
        }
        // Update visual labels on letter keys A-Z or a-z
    }

    private fun updateEnterButtonState(info: EditorInfo?) {
        val action = (info?.imeOptions ?: 0) and EditorInfo.IME_MASK_ACTION
        when (action) {
            EditorInfo.IME_ACTION_SEND -> enterButton.text = "Send ➔"
            EditorInfo.IME_ACTION_SEARCH -> enterButton.text = "Search 🔍"
            EditorInfo.IME_ACTION_GO -> enterButton.text = "Go ➔"
            else -> enterButton.text = "Enter ↵"
        }
    }

    private fun updateSuggestions() {
        // Queries dictionary helper for current prefix and populates suggestionsLayout
    }
}
