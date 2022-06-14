package com.example.trafficfeed.db

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.sqlite.db.SupportSQLiteDatabase
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import com.example.trafficfeed.db.model.TrafficNotification
import com.example.trafficfeed.util.InitializeDatabase
import java.util.concurrent.Executors

@Database(entities = arrayOf(TrafficNotification::class), version = 1)
abstract  class TrafficNotificationDatabase : RoomDatabase() {
    abstract fun trafficNotificationDao(): TrafficNotificationDao

    companion object {
        // Singleton prevents multiple instances of database opening at the
        // same time.
        @Volatile
        private var instance: TrafficNotificationDatabase? = null

        fun getInstance(context: Context): TrafficNotificationDatabase {
            return instance ?: synchronized(this) {
                instance ?: return Room.databaseBuilder(
                    context.applicationContext,
                    TrafficNotificationDatabase::class.java,
                    "trafficnotification_database-db"
                ).addCallback(object: Callback(){
                    override fun onOpen(db: SupportSQLiteDatabase) {
                        super.onOpen(db)
                        val uploadWorkRequest = OneTimeWorkRequestBuilder<InitializeDatabase>()
                            .build()
                        WorkManager.getInstance(context).enqueue(uploadWorkRequest)
                    }
                })
                    .build()
                    .also { instance = it }
            }
        }
    }
}