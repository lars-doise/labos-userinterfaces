package com.example.opnieuw

import android.content.ContentValues.TAG
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.TextView
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import com.example.opnieuw.databinding.ActivityMainBinding
import com.example.opnieuw.model.QuizMaster

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

//        val vraag = findViewById<TextView>(R.id.vraagstellingdink)
//        val quizMaster = QuizMaster
//        vraag.setText(quizMaster.currentQuestion.question)

        val binding: ActivityMainBinding = DataBindingUtil.setContentView(this, R.layout.activity_main)
        binding.quizMaster = QuizMaster;
        binding.handler = this;

    }
    fun onClickHint(view: View){
        val text = "This is a hint!"
        val duration = Toast.LENGTH_SHORT
        val toast = Toast.makeText(applicationContext, text, duration)
        toast.show()


    }

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
}