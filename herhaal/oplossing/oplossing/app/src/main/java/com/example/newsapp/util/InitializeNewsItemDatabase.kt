package com.example.newsapp.util

import android.content.Context
import androidx.work.Worker
import androidx.work.WorkerParameters
import com.example.newsapp.db.NewsItemDatabase
import com.example.newsapp.db.model.NewsItem
import org.json.JSONArray
import org.json.JSONObject

class InitializeNewsItemDatabase(val appContext: Context, workerParams: WorkerParameters):
    Worker(appContext, workerParams) {
    companion object {
        var resp: JSONArray? = null

        fun setResponse(obj: JSONArray) {
            resp = obj
        }
    }

    override fun doWork(): Result {
        if (InitializeNewsItemDatabase.resp == null) {
            return Result.failure()
        } else {
            for (i in 0 until InitializeNewsItemDatabase.resp!!.length()) {
                val itemJson: JSONObject = InitializeNewsItemDatabase.resp!!.getJSONObject(i)

                val newsItem = NewsItem(
                    itemJson.getString("id"),
                    itemJson.getString("category"),
                    itemJson.getString("subcategory"),
                    itemJson.getString("title"),
                    itemJson.getString("content")
                )

                NewsItemDatabase.getInstance(appContext).newsItemDao().insertAll(newsItem)
            }
        }
        return Result.success()
    }
}