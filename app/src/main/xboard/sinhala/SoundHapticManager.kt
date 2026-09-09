package app.src.main.xboard.sinhala

import android.content.Context
import android.media.AudioManager
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager

/**
 * Audio and Haptic feedback controller for X Board
 */
class SoundHapticManager(private val context: Context) {

    companion object {
        const val KEY_TYPE_CHAR = 1
        const val KEY_TYPE_SPACE = 2
        const val KEY_TYPE_ENTER = 3
        const val KEY_TYPE_BACKSPACE = 4
        const val KEY_TYPE_ACTION = 5
    }

    private val audioManager = context.getSystemService(Context.AUDIO_SERVICE) as AudioManager
    private var vibrator: Vibrator? = null

    init {
        vibrator = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            val vibratorManager = context.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as? VibratorManager
            vibratorManager?.defaultVibrator
        } else {
            @Suppress("DEPRECATION")
            context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
        }
    }

    fun playKeyClick(type: Int, soundEnabled: Boolean = true, hapticsEnabled: Boolean = true) {
        if (soundEnabled) {
            val soundEffect = when (type) {
                KEY_TYPE_SPACE -> AudioManager.FX_KEYPRESS_SPACEBAR
                KEY_TYPE_ENTER -> AudioManager.FX_KEYPRESS_RETURN
                KEY_TYPE_BACKSPACE -> AudioManager.FX_KEYPRESS_DELETE
                KEY_TYPE_ACTION -> AudioManager.FX_KEY_CLICK
                else -> AudioManager.FX_KEYPRESS_STANDARD
            }
            audioManager.playSoundEffect(soundEffect)
        }

        if (hapticsEnabled) {
            performHapticVibration()
        }
    }

    private fun performHapticVibration() {
        vibrator?.let {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                it.vibrate(VibrationEffect.createOneShot(12, VibrationEffect.DEFAULT_AMPLITUDE))
            } else {
                @Suppress("DEPRECATION")
                it.vibrate(12)
            }
        }
    }
}
