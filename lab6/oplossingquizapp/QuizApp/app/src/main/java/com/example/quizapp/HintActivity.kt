package com.example.quizapp

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.databinding.ObservableField
import com.example.quizapp.databinding.ActivityHintBinding
import com.example.quizapp.model.QuizMaster

class HintActivity : AppCompatActivity() {

    val NO_HINT: Int = 123
    val TEXT_HINT: Int = 415
    val IMAGE_HINT: Int = 985

    val hintVisibility = ObservableField<Int>()

    companion object {
        val TEXT_HINT_VIEWED: String? = "be.ugent.oomt.quizapp.txtHintViewed"
        val IMAGE_HINT_VIEWED: String = "be.ugent.oomt.quizapp.imageHintViewed"

        fun createIntent(ctx: Context): Intent {
            return Intent(ctx, HintActivity::class.java)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_hint)

        // Get a support ActionBar corresponding to this toolbar and enable the Up button
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        val binding: ActivityHintBinding = DataBindingUtil.setContentView(
            this, R.layout.activity_hint
        )
        binding.quizMaster = QuizMaster
        binding.handler = this

        hintVisibility.set(NO_HINT)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.getItemId()) {
            android.R.id.home -> {
                onBackPressed()
                return true
            }
        }
        return super.onOptionsItemSelected(item)
    }

    fun onShowTextHint() {
        hintVisibility.set(TEXT_HINT)
        val i: Intent = intent
        i.putExtra(TEXT_HINT_VIEWED, true)
        setResult(RESULT_OK, i)
    }

    fun onShowImageHint() {
        hintVisibility.set(IMAGE_HINT)
        val i: Intent = intent
        i.putExtra(IMAGE_HINT_VIEWED, true)
        setResult(RESULT_OK, i)
    }

}