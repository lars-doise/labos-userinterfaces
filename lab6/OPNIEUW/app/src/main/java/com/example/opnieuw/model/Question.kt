package com.example.opnieuw.model

class Question(
    val question: String,
    val answer: String,
    val textHint: String,
    val imageURIHint: String
) {
    companion object QuestionIdCounter {
        private var count: Int = 0

        fun getCount(): Int {
            return count++
        }
    }

    val questionID = getCount()
}