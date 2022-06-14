package com.example.trafficfeed.ui

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.trafficfeed.R
import com.example.trafficfeed.databinding.NotificationViewBinding
import com.example.trafficfeed.db.model.TrafficNotification
import com.example.trafficfeed.util.TrafficNotificationDiffCallback

class TrafficNotificationAdapater() :
    ListAdapter<TrafficNotification, TrafficNotificationAdapater.TrafficNotificationViewHolder>(
        TrafficNotificationDiffCallback()
    ) {

    class TrafficNotificationViewHolder private constructor(val binding: NotificationViewBinding) :
        RecyclerView.ViewHolder(binding.root) {
        companion object {
            fun from(parent: ViewGroup): TrafficNotificationViewHolder {
                val layoutInflater = LayoutInflater.from(parent.context)
                val binding = NotificationViewBinding.inflate(
                    layoutInflater,
                    parent, false
                )
                return TrafficNotificationViewHolder(binding)
            }
        }
    }

    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): TrafficNotificationViewHolder {
        return TrafficNotificationViewHolder.from(parent)
    }

    override fun onBindViewHolder(holder: TrafficNotificationViewHolder, position: Int) {
        val notification: TrafficNotification = getItem(position)
        holder.binding.name = notification.name
        holder.binding.lat = notification.latitude.toString()
        holder.binding.lon = notification.longitude.toString()
        holder.binding.tag = position.toString()
        holder.binding.executePendingBindings()
    }

}
