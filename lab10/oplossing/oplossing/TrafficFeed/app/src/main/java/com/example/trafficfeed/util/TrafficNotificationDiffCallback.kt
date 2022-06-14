package com.example.trafficfeed.util

import androidx.recyclerview.widget.DiffUtil
import com.example.trafficfeed.db.model.TrafficNotification

class TrafficNotificationDiffCallback:DiffUtil.ItemCallback<TrafficNotification>() {
    override fun areItemsTheSame(
        oldItem: TrafficNotification,
        newItem: TrafficNotification
    ): Boolean {
        return oldItem == newItem
    }

    override fun areContentsTheSame(
        oldItem: TrafficNotification,
        newItem: TrafficNotification
    ): Boolean {
        return oldItem == newItem
    }
}