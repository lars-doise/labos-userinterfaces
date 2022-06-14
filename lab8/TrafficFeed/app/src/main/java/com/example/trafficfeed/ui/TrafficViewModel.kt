package com.example.trafficfeed.ui

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import com.example.trafficfeed.db.DummyTrafficNotification
import com.example.trafficfeed.db.TrafficNotificationRepository
import com.example.trafficfeed.db.model.TrafficNotification

class TrafficViewModel(application: Application) : AndroidViewModel(application) {
    val selectedNotification = MutableLiveData(DummyTrafficNotification.get())
    val repo: TrafficNotificationRepository = TrafficNotificationRepository(application)
    private val notifications: LiveData<List<TrafficNotification>>
    val notificationCount: LiveData<Int>
    var currentNotification = 0

    init{
        notifications = repo.notifications
        notificationCount = Transformations.map(notifications){
            if(notifications.value?.size ?: 0 > 0){
                selectedNotification.value = it[currentNotification]
            }
            notifications.value?.size ?: 0
        }
    }

    fun next() {
        if (notificationCount.value ?: 0 > 0) {
            currentNotification++
            currentNotification %= notificationCount.value ?: 0
            selectedNotification.value = notifications.value?.get(currentNotification)
        }
    }

    fun previous() {
        if (notificationCount.value ?: 0 > 0) {
            if (currentNotification == 0)
                currentNotification = (notificationCount.value ?: 1) - 1
            else
                currentNotification--

            currentNotification %= notificationCount.value ?: 0
            selectedNotification.value = notifications.value?.get(currentNotification)
        }
    }
}