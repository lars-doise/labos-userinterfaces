package com.example.newsapp.db

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.newsapp.db.model.Category

@Dao
interface CategoryDao {
    @Query("SELECT * FROM categories")
    fun getAll(): LiveData<List<Category>>

    @Insert(onConflict = OnConflictStrategy.IGNORE)
    fun insertAll(category: Category)
}