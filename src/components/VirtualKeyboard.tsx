import React, { useState, useEffect } from 'react';
import { KeyboardToolbar, ToolType } from './KeyboardToolbar';
import { ToolPanels } from './ToolPanels';
import { FONTS, FontStyle, convertWithFont } from '../data/fonts';
import { playClickSound, triggerHapticFeedback } from '../utils/sound';
import { getDictionarySuggestions, saveWordToDictionary } from '../utils/dictionary';
import { Delete, CornerDownLeft, Globe, Space as SpaceIcon } from 'lucide-react';

interface VirtualKeyboardProps {
  inputText: string;
  onUpdateText: (newText: string, cursorOffset?: number) => void;
  onTriggerEnterAction: () => void;
  onOpenSettingsAd: (actionType: 'enable' | 'select') => void;
  inputMode: 'multiline' | 'send';
  clipboardHistory: string[];
  onAddToClipboard: (text: string) => void;
  onClearClipboard: () => void;
  selectionRange: { start: number; end: number } | null;
  onSetSelectionRange: (range: { start: number; end: number } | null) => void;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  inputText,
  onUpdateText,
  onTriggerEnterAction,
  onOpenSettingsAd,
  inputMode,
  clipboardHistory,
  onAddToClipboard,
  onClearClipboard,
  selectionRange,
  onSetSelectionRange
}) => {
  // Toolbar and Tool panel state
  const [activeTool, setActiveTool] = useState<ToolType>(null);
  const [activeFont, setActiveFont] = useState<FontStyle>(FONTS[0]);

  // Shift state
  // 0 = lowercase
  // 1 = one-click first-letter uppercase (reverts after 1 key typed)
  // 2 = caps locked (double-click)
  const [shiftState, setShiftState] = useState<0 | 1 | 2>(0);
  const [lastShiftClickTime, setLastShiftClickTime] = useState<number>(0);

  // Sound and Haptics state
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [isHapticsOn, setIsHapticsOn] = useState<boolean>(true);

  // Symbol mode (Letters vs ?123 vs symbols)
  const [isSymbolMode, setIsSymbolMode] = useState<boolean>(false);
  const [isAltSymbolMode, setIsAltSymbolMode] = useState<boolean>(false);

  // Extracted current word for auto-suggest
  const [activeWord, setActiveWord] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Calculate current active word being typed
  useEffect(() => {
    const words = inputText.split(/\s+/);
    const last = words[words.length - 1] || '';
    setActiveWord(last);
    if (last.trim()) {
      setSuggestions(getDictionarySuggestions(last, 5));
    } else {
      setSuggestions(['the', 'and', 'you', 'hello', 'keyboard']);
    }
  }, [inputText]);

  // Play sound & haptic wrapper
  const triggerFeedback = (type: 'char' | 'space' | 'enter' | 'backspace' | 'action') => {
    if (isSoundOn) playClickSound(type);
    if (isHapticsOn) triggerHapticFeedback(12);
  };

  // Shift Click Handler:
  // - 1 click: first letter uppercase only
  // - Double click within 320ms: uppercase lock (Caps Lock 🔒)
  const handleShiftClick = () => {
    const now = Date.now();
    triggerFeedback('action');

    if (now - lastShiftClickTime < 320) {
      // Double click -> Caps Lock toggle
      setShiftState((prev) => (prev === 2 ? 0 : 2));
    } else {
      // Single click -> Toggle Title Case (first letter)
      setShiftState((prev) => {
        if (prev === 0) return 1;
        if (prev === 1) return 0;
        return 0; // If was caps locked, click resets to lowercase
      });
    }

    setLastShiftClickTime(now);
  };

  // Key pressed
  const handleCharKey = (rawChar: string) => {
    triggerFeedback('char');

    // Determine uppercase vs lowercase
    const isUpper = shiftState !== 0;
    const resolvedChar = isUpper ? rawChar.toUpperCase() : rawChar.toLowerCase();

    // Convert with selected 24 Unicode Fancy Font
    const fontified = convertWithFont(resolvedChar, activeFont.id);

    // If there is an active selection (e.g. Select All), replace it
    if (selectionRange && selectionRange.end > selectionRange.start) {
      const before = inputText.slice(0, selectionRange.start);
      const after = inputText.slice(selectionRange.end);
      const newText = before + fontified + after;
      onUpdateText(newText, before.length + fontified.length);
      onSetSelectionRange(null);
    } else {
      onUpdateText(inputText + fontified);
    }

    // If 1-click first letter uppercase was active, automatically revert to lowercase
    if (shiftState === 1) {
      setShiftState(0);
    }
  };

  // Backspace key
  const handleBackspace = () => {
    triggerFeedback('backspace');

    // Rule: Select All + Backspace clears everything immediately
    if (selectionRange && selectionRange.end > selectionRange.start) {
      const before = inputText.slice(0, selectionRange.start);
      const after = inputText.slice(selectionRange.end);
      onUpdateText(before + after, before.length);
      onSetSelectionRange(null);
      return;
    }

    if (inputText.length > 0) {
      // Handle surrogate pairs or unicode sequences correctly
      const chars = Array.from(inputText);
      chars.pop();
      onUpdateText(chars.join(''));
    }
  };

  // Space key with "X Board" branding
  const handleSpace = () => {
    triggerFeedback('space');

    // Save preceding word to dictionary auto-save
    if (activeWord.trim()) {
      saveWordToDictionary(activeWord);
    }

    if (selectionRange && selectionRange.end > selectionRange.start) {
      const before = inputText.slice(0, selectionRange.start);
      const after = inputText.slice(selectionRange.end);
      onUpdateText(before + ' ' + after, before.length + 1);
      onSetSelectionRange(null);
    } else {
      onUpdateText(inputText + ' ');
    }
  };

  // Enter key
  const handleEnter = () => {
    triggerFeedback('enter');

    if (activeWord.trim()) {
      saveWordToDictionary(activeWord);
    }

    if (inputMode === 'send') {
      onTriggerEnterAction();
    } else {
      onUpdateText(inputText + '\n');
    }
  };

  // Suggestion selected
  const handleSelectSuggestion = (word: string) => {
    triggerFeedback('action');

    // Replace the active incomplete word with the suggestion
    const words = inputText.split(/\s+/);
    words.pop();
    const prefix = words.length > 0 ? words.join(' ') + ' ' : '';
    const convertedWord = convertWithFont(word, activeFont.id);
    const newText = prefix + convertedWord + ' ';
    onUpdateText(newText);
    saveWordToDictionary(word);
  };

  // Insert arbitrary text (from Emojis or 20 Text Decoration styles)
  const handleInsertDecoratedText = (text: string) => {
    triggerFeedback('char');
    if (selectionRange && selectionRange.end > selectionRange.start) {
      const before = inputText.slice(0, selectionRange.start);
      const after = inputText.slice(selectionRange.end);
      onUpdateText(before + text + after, before.length + text.length);
      onSetSelectionRange(null);
    } else {
      onUpdateText(inputText + text);
    }
  };

  // Clipboard operations
  const handleSelectAll = () => {
    triggerFeedback('action');
    if (inputText.length > 0) {
      onSetSelectionRange({ start: 0, end: inputText.length });
    }
  };

  const handleCopy = () => {
    triggerFeedback('action');
    let textToCopy = inputText;
    if (selectionRange && selectionRange.end > selectionRange.start) {
      textToCopy = inputText.slice(selectionRange.start, selectionRange.end);
    }
    if (textToCopy.trim()) {
      onAddToClipboard(textToCopy);
      navigator.clipboard?.writeText(textToCopy).catch(() => {});
    }
  };

  const handleCut = () => {
    triggerFeedback('action');
    if (selectionRange && selectionRange.end > selectionRange.start) {
      const selected = inputText.slice(selectionRange.start, selectionRange.end);
      onAddToClipboard(selected);
      navigator.clipboard?.writeText(selected).catch(() => {});

      const before = inputText.slice(0, selectionRange.start);
      const after = inputText.slice(selectionRange.end);
      onUpdateText(before + after, before.length);
      onSetSelectionRange(null);
    } else if (inputText.length > 0) {
      onAddToClipboard(inputText);
      navigator.clipboard?.writeText(inputText).catch(() => {});
      onUpdateText('');
    }
  };

  const handlePaste = async () => {
    triggerFeedback('action');
    let clipText = clipboardHistory[0] || '';
    try {
      if (navigator.clipboard) {
        const sysClip = await navigator.clipboard.readText();
        if (sysClip) clipText = sysClip;
      }
    } catch {
      // Use internal clipboard history
    }

    if (clipText) {
      if (selectionRange && selectionRange.end > selectionRange.start) {
        const before = inputText.slice(0, selectionRange.start);
        const after = inputText.slice(selectionRange.end);
        onUpdateText(before + clipText + after, before.length + clipText.length);
        onSetSelectionRange(null);
      } else {
        onUpdateText(inputText + clipText);
      }
    }
  };

  // Layout rows
  const isUpper = shiftState !== 0;

  const letterRow1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const letterRow2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const letterRow3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

  const symbolRow1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const symbolRow2 = ['@', '#', '$', '%', '&', '-', '+', '(', ')'];
  const symbolRow3 = ['*', '"', "'", ':', ';', '!', '?'];

  const altSymbolRow1 = ['~', '`', '|', '•', '√', 'π', '÷', '×', '§', 'Δ'];
  const altSymbolRow2 = ['£', '€', '¥', '¢', '^', '°', '=', '{', '}'];
  const altSymbolRow3 = ['\\', '%', '©', '®', '™', '✓', '[]'];

  return (
    <div
      id="xboard-virtual-keyboard-root"
      className="w-full bg-[#121214] border-t-2 border-[#202026] select-none flex flex-col shadow-2xl transition-all"
    >
      {/* 1. TOP TOOLBAR & AUTO-SUGGEST STRIP */}
      <KeyboardToolbar
        activeTool={activeTool}
        onSelectTool={(tool) => setActiveTool(tool)}
        activeFont={activeFont}
        isSoundOn={isSoundOn}
        onToggleSound={() => setIsSoundOn((prev) => !prev)}
        suggestions={suggestions}
        onSelectSuggestion={handleSelectSuggestion}
        activeWord={activeWord}
      />

      {/* 2. SWITCHABLE BODY: Tool Panels vs Keyboard Keys */}
      {activeTool !== null ? (
        <ToolPanels
          activeTool={activeTool}
          onClose={() => setActiveTool(null)}
          activeFont={activeFont}
          onSelectFont={(font) => {
            setActiveFont(font);
            // User can select font and go back to keys to type!
            setActiveTool(null);
          }}
          onInsertText={handleInsertDecoratedText}
          clipboardHistory={clipboardHistory}
          onSelectAll={handleSelectAll}
          onCopy={handleCopy}
          onCut={handleCut}
          onPaste={handlePaste}
          onClearClipboard={onClearClipboard}
          isSoundOn={isSoundOn}
          onToggleSound={() => setIsSoundOn((prev) => !prev)}
          isHapticsOn={isHapticsOn}
          onToggleHaptics={() => setIsHapticsOn((prev) => !prev)}
          activeWord={activeWord}
          onBackspace={handleBackspace}
          onSpace={handleSpace}
          onEnter={handleEnter}
          inputMode={inputMode}
        />
      ) : (
        /* Standard Keypad Rows */
        <div id="keyboard-keys-container" className="p-1.5 space-y-1.5 bg-[#121214]">
          {/* ROW 1 */}
          <div className="flex gap-1 justify-center">
            {(!isSymbolMode ? letterRow1 : isAltSymbolMode ? altSymbolRow1 : symbolRow1).map(
              (char) => {
                const displayChar = isSymbolMode ? char : isUpper ? char.toUpperCase() : char;
                return (
                  <button
                    key={char}
                    id={`key-${displayChar}`}
                    onClick={() => handleCharKey(displayChar)}
                    className="flex-1 h-12 rounded-lg bg-[#202026] hover:bg-[#2a2a34] active:bg-[#07f57e] active:text-black text-white font-medium text-lg flex items-center justify-center transition active:scale-95 shadow cursor-pointer border border-[#2d2d38]"
                  >
                    {displayChar}
                  </button>
                );
              }
            )}
          </div>

          {/* ROW 2 */}
          <div className="flex gap-1 justify-center px-2 sm:px-3">
            {(!isSymbolMode ? letterRow2 : isAltSymbolMode ? altSymbolRow2 : symbolRow2).map(
              (char) => {
                const displayChar = isSymbolMode ? char : isUpper ? char.toUpperCase() : char;
                return (
                  <button
                    key={char}
                    id={`key-${displayChar}`}
                    onClick={() => handleCharKey(displayChar)}
                    className="flex-1 h-12 rounded-lg bg-[#202026] hover:bg-[#2a2a34] active:bg-[#07f57e] active:text-black text-white font-medium text-lg flex items-center justify-center transition active:scale-95 shadow cursor-pointer border border-[#2d2d38]"
                  >
                    {displayChar}
                  </button>
                );
              }
            )}
          </div>

          {/* ROW 3: Shift, Characters, Backspace */}
          <div className="flex gap-1 justify-center">
            {/* SHIFT KEY: Color #07F57E, 1 click = first letter only, double click = caps lock */}
            {!isSymbolMode ? (
              <button
                id="key-shift-button"
                onClick={handleShiftClick}
                className={`w-[14%] sm:w-[15%] h-12 rounded-lg font-bold text-lg flex flex-col items-center justify-center transition active:scale-95 shadow cursor-pointer ${
                  shiftState === 2
                    ? 'bg-[#07f57e] text-black ring-2 ring-white'
                    : shiftState === 1
                    ? 'bg-[#07f57e] text-black'
                    : 'bg-[#07f57e]/85 hover:bg-[#07f57e] text-black'
                }`}
                title={
                  shiftState === 2
                    ? 'Caps Lock Locked (Double Click)'
                    : shiftState === 1
                    ? 'First Letter Uppercase (1 Click)'
                    : 'Shift (1 Click: Uppercase, Double Click: Caps Lock)'
                }
              >
                <span>{shiftState === 2 ? '🔒' : shiftState === 1 ? '⇪' : '⇧'}</span>
                {shiftState === 1 && (
                  <span className="text-[9px] font-mono leading-none tracking-tight -mt-0.5">
                    1-UP
                  </span>
                )}
              </button>
            ) : (
              <button
                id="key-alt-symbol-toggle"
                onClick={() => setIsAltSymbolMode((prev) => !prev)}
                className="w-[14%] sm:w-[15%] h-12 rounded-lg bg-[#202026] text-white text-xs font-bold flex items-center justify-center border border-[#2d2d38] active:scale-95 cursor-pointer"
              >
                {isAltSymbolMode ? '1/2' : '2/2'}
              </button>
            )}

            {/* Middle Letters / Symbols */}
            {(!isSymbolMode ? letterRow3 : isAltSymbolMode ? altSymbolRow3 : symbolRow3).map(
              (char) => {
                const displayChar = isSymbolMode ? char : isUpper ? char.toUpperCase() : char;
                return (
                  <button
                    key={char}
                    id={`key-${displayChar}`}
                    onClick={() => handleCharKey(displayChar)}
                    className="flex-1 h-12 rounded-lg bg-[#202026] hover:bg-[#2a2a34] active:bg-[#07f57e] active:text-black text-white font-medium text-lg flex items-center justify-center transition active:scale-95 shadow cursor-pointer border border-[#2d2d38]"
                  >
                    {displayChar}
                  </button>
                );
              }
            )}

            {/* BACKSPACE KEY */}
            <button
              id="key-backspace-button"
              onClick={handleBackspace}
              className="w-[14%] sm:w-[15%] h-12 rounded-lg bg-[#202026] hover:bg-[#2a2a34] active:bg-[#2f2f3c] text-white flex items-center justify-center transition active:scale-95 shadow cursor-pointer border border-[#2d2d38]"
              title="Backspace (Clears selected text if highlighted)"
            >
              <Delete className="w-5 h-5 text-neutral-200" />
            </button>
          </div>

          {/* ROW 4: ?123, Comma, Dedicated Emoji 😊, Space ("X Board"), Period, Enter */}
          <div className="flex gap-1 sm:gap-1.5 justify-center">
            {/* Symbol mode toggle */}
            <button
              id="key-symbol-mode-toggle"
              onClick={() => {
                triggerFeedback('action');
                setIsSymbolMode((prev) => !prev);
              }}
              className="w-[14%] sm:w-[12%] h-12 rounded-lg bg-[#202026] hover:bg-[#282834] text-white text-xs font-bold flex items-center justify-center border border-[#2d2d38] active:scale-95 cursor-pointer"
            >
              {isSymbolMode ? 'ABC' : '?123'}
            </button>

            {/* Comma key */}
            <button
              id="key-comma-or-emoji"
              onClick={() => {
                handleCharKey(',');
              }}
              className="w-[8%] sm:w-[7%] h-12 rounded-lg bg-[#202026] hover:bg-[#282834] text-white text-base font-bold flex items-center justify-center border border-[#2d2d38] active:scale-95 cursor-pointer"
            >
              ,
            </button>

            {/* Dedicated Emoji quick key */}
            <button
              id="key-emoji-toggle"
              onClick={() => {
                triggerFeedback('action');
                setActiveTool(activeTool === 'emoji' ? null : 'emoji');
              }}
              className={`w-[11%] sm:w-[10%] h-12 rounded-lg ${
                activeTool === 'emoji'
                  ? 'bg-[#07f57e] text-black shadow-md font-bold'
                  : 'bg-[#202026] hover:bg-[#282834] text-white'
              } text-xl flex items-center justify-center border border-[#2d2d38] active:scale-95 cursor-pointer transition`}
              title="Open Emoji & Emoticon Picker"
            >
              😊
            </button>

            {/* SPACE BUTTON: Color #07F57E, Label "X Board" explicitly */}
            <button
              id="key-space-button"
              onClick={handleSpace}
              className="flex-1 h-12 rounded-lg bg-[#07f57e] hover:bg-[#07f57e]/90 active:bg-white text-black font-extrabold text-sm flex items-center justify-center gap-2 transition active:scale-[0.99] shadow cursor-pointer tracking-wider"
              title="Space (X Board)"
            >
              <SpaceIcon className="w-4 h-4 opacity-70" />
              <span>X Board</span>
            </button>

            {/* Period key */}
            <button
              id="key-period-button"
              onClick={() => {
                handleCharKey('.');
              }}
              className="w-[8%] sm:w-[7%] h-12 rounded-lg bg-[#202026] hover:bg-[#282834] text-white text-base font-bold flex items-center justify-center border border-[#2d2d38] active:scale-95 cursor-pointer"
            >
              .
            </button>

            {/* ENTER BUTTON: Color #07F57E, Newline or Send */}
            <button
              id="key-enter-button"
              onClick={handleEnter}
              className="w-[17%] sm:w-[15%] h-12 rounded-lg bg-[#07f57e] hover:bg-[#07f57e]/90 active:bg-white text-black font-extrabold text-xs flex items-center justify-center gap-1 transition active:scale-95 shadow cursor-pointer"
              title={inputMode === 'send' ? 'Send Message' : 'New Line'}
            >
              {inputMode === 'send' ? (
                <>
                  <span>Send</span>
                  <span>➔</span>
                </>
              ) : (
                <>
                  <span>Enter</span>
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
