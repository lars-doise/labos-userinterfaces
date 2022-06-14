package com.example.newsapp.db

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.newsapp.db.model.NewsItem

@Dao
interface NewsItemDao {
    @Query("SELECT * FROM news_items")
    fun getAll(): LiveData<List<NewsItem>>

    @Insert(onConflict = OnConflictStrategy.IGNORE)
    fun insertAll(newsItem: NewsItem)
}