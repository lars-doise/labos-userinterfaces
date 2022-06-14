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


@Database(entities = arrayOf(TrafficNotification::class), version = 1)
abstract class TrafficNotificationDatabase : RoomDatabase() {
    abstract fun trafficNotificationDao(): TrafficNotificationDao

    companion object {
        @Volatile
        private var instance: TrafficNotificationDatabase? = null

        /* Alternative solution
        fun getInstance(context: Context): TrafficNotificationDatabase {
            return instance ?: synchronized(this) {
                instance ?: return Room.databaseBuilder(
                    context.applicationContext,
                    TrafficNotificationDatabase::class.java,
                    "trafficnotification_database-db"
                ).addCallback(object : RoomDatabase.Callback() {
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
         */
        fun getInstance(context: Context): TrafficNotificationDatabase {
            val tempInstance = instance;
            if (tempInstance == null) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    TrafficNotificationDatabase::class.java,
                    "traffic_notification_database"
                )
                    .addCallback(object : Callback() {
                        override fun onCreate(db: SupportSQLiteDatabase) {
                            super.onCreate(db)
                            val uploadWorkRequest =
                                OneTimeWorkRequestBuilder<InitializeDatabase>().build()
                            WorkManager.getInstance(context).enqueue(uploadWorkRequest)
                        }
                    })
                    .build()
                this.instance = instance
                return instance
            } else {
                return tempInstance
            }
        }
    }
}