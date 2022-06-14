package com.example.trafficfeed.db

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import com.example.trafficfeed.db.model.TrafficNotification

@Dao
interface TrafficNotificationDao {
    @Query("SELECT * FROM traffic_notifications")
    fun getAll(): LiveData<List<TrafficNotification>>

    @Query("SELECT * FROM traffic_notifications WHERE statement LIKE :criteria")
    fun findByCriteria(criteria: String): List<TrafficNotification>

    @Insert
    fun insertAll(vararg traficNotification: TrafficNotification)

    @Delete
    fun delete(traficNotification: TrafficNotification)
}
