package com.example.newsapp.ui

import android.app.Application
import android.util.Log
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import com.example.newsapp.db.NewsRepository
import com.example.newsapp.db.model.Category
import com.example.newsapp.db.model.NewsItem

class NewsViewModel(application: Application) : AndroidViewModel(application) {
    var selectedCategory: Category = Category("", "", listOf())
    val categories: LiveData<List<Category>>
    val subCategories: MutableLiveData<List<String>>
    val newsItems: LiveData<List<NewsItem>>
    val selectedNewsItems: MutableLiveData<List<NewsItem>> = MutableLiveData()
    val filteredNewsItems: MutableLiveData<List<NewsItem>> = MutableLiveData()
    var selectedNewsItem: NewsItem = NewsItem("", "", "", "", "")

    val categoryCount: LiveData<Int>
    val newsItemCount: LiveData<Int>

    init {
        val repo = NewsRepository(application)
        categories = repo.categories
        newsItems = repo.newsItems
        categoryCount = Transformations.map(categories) {
            categories.value?.size ?: 0
        }

        subCategories = MutableLiveData(selectedCategory.subcategorieen)

        newsItemCount = Transformations.map(newsItems) {
            newsItems.value?.size ?: 0
        }
    }

    fun selectCategory(selectedId: String) {
        categories.value?.forEach {
            if (it.id == selectedId) {
                selectedCategory = it
                subCategories.value = selectedCategory.subcategorieen
            }
        }
    }

    fun selectSubCategory(selectedSubCategory: String) {
        val _selectedNewsItems = mutableListOf<NewsItem>()
        newsItems.value?.forEach {
            if (it.subCategory == selectedSubCategory) {
                _selectedNewsItems.add(it)
            }
        }

        selectedNewsItems.value = _selectedNewsItems
        filteredNewsItems.value = _selectedNewsItems
    }

    fun filterNewsItems(query: String) {
        if (query == "") {
            filteredNewsItems.value = selectedNewsItems.value
        } else {
            val _filteredNewsItems = mutableListOf<NewsItem>()
            selectedNewsItems.value?.forEach {
                if (it.title.contains(query, ignoreCase = true)) {
                    _filteredNewsItems.add(it)
                }
            }
            filteredNewsItems.value = _filteredNewsItems
        }
    }

    fun selectNewsItem(selectedId: String){
        filteredNewsItems.value?.forEach {
            if (it.id == selectedId) {
                selectedNewsItem = it
            }
        }
    }
}