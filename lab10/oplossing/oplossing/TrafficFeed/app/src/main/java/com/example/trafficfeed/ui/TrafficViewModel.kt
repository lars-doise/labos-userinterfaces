package com.example.trafficfeed.ui

import android.app.Application
import androidx.lifecycle.*
import com.example.trafficfeed.db.DummyTrafficNotification
import com.example.trafficfeed.db.TrafficNotificationRepository
import com.example.trafficfeed.db.model.TrafficNotification
import kotlin.random.Random

class TrafficViewModel(application: Application) : AndroidViewModel(application) {
    var currentNotification = 0
    val notifications: LiveData<List<TrafficNotification>>
    val notificationCount: LiveData<Int>
    var selectedNotification = MutableLiveData(DummyTrafficNotification.get())
    val rand = Random(8501)

    init {
        val repo = TrafficNotificationRepository(application)
        notifications = repo.notifications

        notificationCount = Transformations.map(notifications) {
            if (notifications.value?.size ?: 0 > 0) {
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

    fun random(){
        val count:Int = notificationCount.value ?: 0
        if(count > 0){
            currentNotification = rand.nextInt(count)
            selectedNotification.value = notifications.value?.get(currentNotification)
        }
    }

    fun select(index: Int) {
        selectedNotification.value = notifications.value?.get(index)
    }
}