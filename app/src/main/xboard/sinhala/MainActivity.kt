package app.src.main.xboard.sinhala

import android.content.Intent
import android.os.Bundle
import android.provider.Settings
import android.view.inputmethod.InputMethodManager
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.rewarded.RewardedAd
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback

/**
 * X Board Main Setup & Activation Activity
 * Required Flow:
 * When user clicks "Enable Keyboard" or "Select Keyboard", an Ad plays before proceeding.
 */
class MainActivity : AppCompatActivity() {

    private var rewardedAd: RewardedAd? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Initialize Google Mobile Ads SDK
        MobileAds.initialize(this) {}
        loadAdMobRewardedAd()

        val btnEnableKeyboard = findViewById<Button>(R.id.btn_enable_keyboard)
        val btnSelectKeyboard = findViewById<Button>(R.id.btn_select_keyboard)

        // Step 1: Enable X Board Keyboard -> Play Ad first!
        btnEnableKeyboard.setOnClickListener {
            playAdAndExecute {
                startActivity(Intent(Settings.ACTION_INPUT_METHOD_SETTINGS))
                Toast.makeText(this, "Enable 'X Board' in your Keyboard Settings", Toast.LENGTH_LONG).show()
            }
        }

        // Step 2: Select X Board Keyboard as active IME -> Play Ad first!
        btnSelectKeyboard.setOnClickListener {
            playAdAndExecute {
                val imm = getSystemService(INPUT_METHOD_SERVICE) as InputMethodManager
                imm.showInputMethodPicker()
            }
        }
    }

    private fun loadAdMobRewardedAd() {
        val adRequest = AdRequest.Builder().build()
        // AdMob Test Rewarded Ad Unit ID
        RewardedAd.load(
            this,
            "ca-app-pub-3940256099942544/5224354917",
            adRequest,
            object : RewardedAdLoadCallback() {
                override fun onAdFailedToLoad(adError: LoadAdError) {
                    rewardedAd = null
                }

                override fun onAdLoaded(ad: RewardedAd) {
                    rewardedAd = ad
                }
            }
        )
    }

    private fun playAdAndExecute(onFinished: () -> Unit) {
        if (rewardedAd != null) {
            rewardedAd?.show(this) { _ ->
                onFinished()
                loadAdMobRewardedAd()
            }
        } else {
            // If ad is loading or offline, still allow user to activate
            onFinished()
            loadAdMobRewardedAd()
        }
    }
}
