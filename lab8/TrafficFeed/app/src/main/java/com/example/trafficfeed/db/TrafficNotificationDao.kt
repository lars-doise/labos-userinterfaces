package com.example.trafficfeed.db

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import com.example.trafficfeed.db.model.TrafficNotification

@Dao
interface TrafficNotificationDao {
    @Query("SELECT * FROM notifications")
    fun getAll(): LiveData<List<TrafficNotification>>

    @Insert
    fun insertAll(notifications: MutableList<TrafficNotification>)
    //fun insertAll(vararg notification: TrafficNotification)

}