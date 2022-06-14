package com.example.newsapp.db

import android.content.Context
import android.util.Log
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.sqlite.db.SupportSQLiteDatabase
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import com.android.volley.Request
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.example.newsapp.db.model.NewsItem
import com.example.newsapp.util.InitializeNewsItemDatabase

@Database(entities = arrayOf(NewsItem::class), version = 1)
abstract class NewsItemDatabase: RoomDatabase() {
    abstract fun newsItemDao(): NewsItemDao

    companion object {
        @Volatile
        private var instance: NewsItemDatabase? = null

        fun getInstance(context: Context): NewsItemDatabase {
            return instance ?: synchronized(this) {
                instance ?: return Room.databaseBuilder(
                    context.applicationContext,
                    NewsItemDatabase::class.java,
                    "news_item_database-db"
                ).addCallback(object : RoomDatabase.Callback() {
                    override fun onOpen(db: SupportSQLiteDatabase) {
                        super.onOpen(db)

                        val url = "https://623b4a952e056d1037f0689b.mockapi.io/items"
                        val jsonArrayRequest = JsonArrayRequest(
                            Request.Method.GET, url, null,
                            { response ->
                                InitializeNewsItemDatabase.setResponse(response)
                                val uploadWorkRequest = OneTimeWorkRequestBuilder<InitializeNewsItemDatabase>().build()
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