package com.example.opnieuw.model

import androidx.databinding.ObservableField

object QuizMaster {
    private val questionRepository: HashMap<Int, Question> = HashMap()
    private var iterator: Iterator<Question>
    val userAnswer = ObservableField<String>()
    val currentQuestion = ObservableField<Question>()

    init {
        loadQuestions()
        iterator = questionRepository.values.iterator()
        nextQuestion()
    }

    fun validateAnswer(): Boolean {
        return userAnswer.get() == currentQuestion.get()?.answer
    }
    fun nextQuestion() {
        if (!iterator.hasNext()) {
            iterator = questionRepository.values.iterator()
        }
        currentQuestion.set(iterator.next())
    }
    private fun loadQuestions() {
        val q1: Question = Question(
            "How much is 2+2?",
            "4",
            "One more than three",
            "http://terrehautebridge.com/wp-content/uploads/2015/06/take-four.jpg"
        );
        val q2: Question = Question(
            "What is the city of your university?",
            "Gent",
            "It is not Leuven",
            "https://styleguide.ugent.be/files/uploads/logo_UGent_NL_RGB_2400_kleur_witbg.png"
        )
        questionRepository[q1.questionID] = q1
        questionRepository[q2.questionID] = q2
    }

}
