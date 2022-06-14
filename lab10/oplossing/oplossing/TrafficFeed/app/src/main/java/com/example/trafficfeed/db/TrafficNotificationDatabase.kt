package com.example.trafficfeed.db

import android.content.Context
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.sqlite.db.SupportSQLiteDatabase
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import com.android.volley.Request
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.example.trafficfeed.db.model.TrafficNotification
import com.example.trafficfeed.util.InitializeDatabase
import java.util.concurrent.Executors
import org.json.JSONObject

@Database(entities = arrayOf(TrafficNotification::class), version = 1)
abstract class TrafficNotificationDatabase : RoomDatabase() {
    abstract fun trafficNotificationDao(): TrafficNotificationDao

    companion object {
        // Singleton prevents multiple instances of database opening at the
        // same time.
        @Volatile
        private var instance: TrafficNotificationDatabase? = null
        private val url = "http://192.168.0.253:8081/notifications"

        fun getInstance(context: Context): TrafficNotificationDatabase {
            return instance ?: synchronized(this) {
                instance ?: return Room.databaseBuilder(
                    context.applicationContext,
                    TrafficNotificationDatabase::class.java,
                    "trafficnotification_database-db"
                ).addCallback(object : Callback() {
                    override fun onOpen(db: SupportSQLiteDatabase) {
                        super.onOpen(db)

                        val jsonArrayRequest = JsonArrayRequest(Request.Method.GET, url, null,
                            { response ->
                                InitializeDatabase.addJsonArray(response)
                                // In plaats van een companion object kunnen we ook data meegeven met de WorkRequest
                                // Hiervoor zouden we onze JSON array moeten omzetten naar een string en via setInputData
                                // functie meegeven met de WorkRequest
                                //val uploadWorkRequest = OneTimeWorkRequestBuilder<InitializeDatabase>()
                                //                                            .setInputData(Data.Builder().putString("key", response.toString()).build())
                                //                                            .build()
                                // meer info: https://developer.android.com/topic/libraries/architecture/workmanager/advanced#params

                                val uploadWorkRequest = OneTimeWorkRequestBuilder<InitializeDatabase>()
                                    .build()
                                WorkManager.getInstance(context).enqueue(uploadWorkRequest)
                            }, { error ->
                                error.printStackTrace()
                            })

                        Volley.newRequestQueue(context).add(jsonArrayRequest)
                    }
                })
                    .build()
                    .also { instance = it }
            }
        }
    }
}