package com.example.newsapp.db

import android.content.Context
import android.util.Log
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import androidx.sqlite.db.SupportSQLiteDatabase
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import com.android.volley.Request
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.example.newsapp.db.model.Category
import com.example.newsapp.db.model.NewsConverters
import com.example.newsapp.util.InitializeCategoryDatabase

@Database(entities = arrayOf(Category::class), version = 1)
@TypeConverters(NewsConverters::class)
abstract class CategoryDatabase : RoomDatabase() {
    abstract fun categoryDao(): CategoryDao

    companion object {
        @Volatile
        private var instance: CategoryDatabase? = null

        fun getInstance(context: Context): CategoryDatabase {
            return instance ?: synchronized(this) {
                instance ?: return Room.databaseBuilder(
                    context.applicationContext,
                    CategoryDatabase::class.java,
                    "category_database-db"
                ).addCallback(object : Callback() {
                    override fun onOpen(db: SupportSQLiteDatabase) {
                        super.onOpen(db)

                        val url = "https://623b4a952e056d1037f0689b.mockapi.io/onderwerpen"
                        val jsonArrayRequest = JsonArrayRequest(
                            Request.Method.GET, url, null,
                            { response ->
                                InitializeCategoryDatabase.setResponse(response)

                                val uploadWorkRequest = OneTimeWorkRequestBuilder<InitializeCategoryDatabase>().build()
                                WorkManager.getInstance(context).enqueue(uploadWorkRequest)
                            },
                            { error ->
                                Log.i("test", "error")
                                error.printStackTrace()
                            }
                        )

                        val queue = Volley.newRequestQueue(context.applicationContext)
                        queue.add(jsonArrayRequest)
                    }
                })
                    .build()
                    .also { instance = it }
            }
        }
    }
}