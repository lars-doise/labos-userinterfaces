package com.example.trafficfeed.util

import android.content.Context
import android.util.Log
import androidx.work.Worker
import androidx.work.WorkerParameters
import com.example.trafficfeed.db.TrafficNotificationDatabase
import com.example.trafficfeed.db.model.TrafficNotification
import org.json.JSONArray
import org.json.JSONObject

class InitializeDatabase(val appContext: Context, workerParams: WorkerParameters) :
    Worker(appContext, workerParams) {

    companion object {
        var resp: JSONArray? = null

        fun addJsonArray(json: JSONArray) {
            resp = json
            Log.i("test", json.toString())
        }
    }

    override fun doWork(): Result {
        if (resp == null) {
            return Result.failure()
        } else {
            for (i in 0 until resp!!.length()) {
                val notJson: JSONObject = resp!!.getJSONObject(i)
                val not = TrafficNotification(
                    notJson.getString("uuid"),
                    notJson.getString("name"),
                    notJson.getString("type"),
                    notJson.getString("source"),
                    notJson.getString("transport"),
                    notJson.getString("message"),
                    notJson.getDouble("latitude"),
                    notJson.getDouble("longitude"),
                    notJson.getString("date")
                )

                TrafficNotificationDatabase.getInstance(appContext).trafficNotificationDao()
                    .insertAll(not)
            }
        }

        return Result.success()
    }
}