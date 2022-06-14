package com.example.newsapp.db

import android.app.Application
import androidx.lifecycle.LiveData
import com.example.newsapp.db.model.Category
import com.example.newsapp.db.model.NewsItem

class NewsRepository(application: Application) {
    val categories: LiveData<List<Category>>
    val newsItems: LiveData<List<NewsItem>>

    init {
        CategoryDatabase.getInstance(application).categoryDao().also {
            categories = it.getAll()
        }
        NewsItemDatabase.getInstance(application).newsItemDao().also {
            newsItems = it.getAll()
        }
    }
}