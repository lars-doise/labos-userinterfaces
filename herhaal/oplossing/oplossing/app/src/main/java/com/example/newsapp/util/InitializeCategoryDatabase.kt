package com.example.newsapp.util

import android.content.Context
import androidx.work.Worker
import androidx.work.WorkerParameters
import com.example.newsapp.db.CategoryDatabase
import com.example.newsapp.db.model.Category
import org.json.JSONArray
import org.json.JSONObject
import java.util.ArrayList

class InitializeCategoryDatabase(val appContext: Context, workerParams: WorkerParameters) :
    Worker(appContext, workerParams) {
    companion object {
        var resp: JSONArray? = null

        fun setResponse(obj: JSONArray) {
            resp = obj
        }
    }

    override fun doWork(): Result {
        if (resp == null) {
            return Result.failure()
        } else {
            for (i in 0 until resp!!.length()) {
                val catJson: JSONObject = resp!!.getJSONObject(i)
                //Log.i("REST", catJson.getString("id"))
                //Log.i("REST", catJson.getString("title"))
                //Log.i("REST", catJson.getString("subcategorieen"))

                val jArray: JSONArray = catJson.getJSONArray("subcategorieen")
                val list: MutableList<String> = ArrayList()
                for (i in 0 until jArray.length()) {
                    list.add(i, jArray.getString(i))
                }
                val category = Category(
                    catJson.getString("id"),
                    catJson.getString("title"),
                    list
                )

                CategoryDatabase.getInstance(appContext).categoryDao().insertAll(category)
            }
        }
        return Result.success()
    }
}