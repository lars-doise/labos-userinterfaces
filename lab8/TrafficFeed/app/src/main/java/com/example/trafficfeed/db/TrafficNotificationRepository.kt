package com.example.trafficfeed.db

import android.app.Application
import androidx.lifecycle.LiveData
import com.example.trafficfeed.db.model.TrafficNotification

class TrafficNotificationRepository(application: Application) {
    val notifications: LiveData<List<TrafficNotification>>

    init{
        val notificationDao= TrafficNotificationDatabase.getInstance(application).trafficNotificationDao()
        notifications = notificationDao.getAll()
    }
}