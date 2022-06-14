package com.example.quizapp

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import com.example.quizapp.databinding.ActivityMainBinding
import com.example.quizapp.model.QuizMaster

class MainActivity : AppCompatActivity() {
    private val TAG = "MainActivity"

    private companion object {
        val HINT_REQUEST = 1
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val binding: ActivityMainBinding = DataBindingUtil.setContentView(
            this, R.layout.activity_main
        )
        binding.quizMaster = QuizMaster
        binding.handler = this
        //val vraag = findViewById<TextView>(R.id.textView)
        //val quizMaster = QuizMaster
        //vraag.setText(quizMaster.currentQuestion.question)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        Log.i("MAIN", "onActivityResult");
        if (requestCode == HINT_REQUEST) {
            var feedback: String = ""
            if (resultCode == Activity.RESULT_OK) {
                if (data != null) {
                    if (data.getBooleanExtra(HintActivity.TEXT_HINT_VIEWED, false)) {
                        feedback += getString(R.string.text_hint_shown)
                    }
                    if (data.getBooleanExtra(HintActivity.IMAGE_HINT_VIEWED, false)) {
                        feedback += "\n" + getString(R.string.image_hint_shown);
                    }
                }
            } else {
                feedback = getString(R.string.no_hints_shown);
            }
            val toast = Toast.makeText(applicationContext, feedback, Toast.LENGTH_SHORT)
            toast.show()
        }
    }

    fun onClickHint(view: View) {
        // Show toast
        //val text = "This is a hint!"
        //val duration = Toast.LENGTH_SHORT
        //val toast = Toast.makeText(applicationContext, text, duration)
        //toast.show()

        val i = HintActivity.createIntent(this)
        startActivityForResult(i, HINT_REQUEST)
    }

    @SuppressLint("ShowToast")
    fun onClickOk() {
        val duration = Toast.LENGTH_SHORT
        val toast: Toast

        if (QuizMaster.validateAnswer()) {
            QuizMaster.nextQuestion()
            toast = Toast.makeText(
                applicationContext,
                QuizMaster.userAnswer.get() + " is correct!",
                duration
            )
            Log.i(TAG, QuizMaster.currentQuestion.get()?.question ?: "")
        } else {
            toast = Toast.makeText(
                applicationContext,
                QuizMaster.userAnswer.get() + " is incorrect!",
                duration
            )
        }
        QuizMaster.userAnswer.set("")
        toast.show()
    }

    override fun onStart() {
        super.onStart()
        Log.i(TAG, "app started")
    }

    override fun onStop() {
        super.onStop()
        Log.i(TAG, "app stopped")
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.i(TAG, "app destroyed")
    }

    override fun onPause() {
        super.onPause()
        Log.i(TAG, "app paused")
    }
}