package com.example.trafficfeed.view

import android.widget.ImageView
import androidx.databinding.BindingAdapter
import com.example.trafficfeed.R

@BindingAdapter("app:figname")
fun setImageURL(view: ImageView, name: String?) {
    if (name != null) {
        if (name == "iRail Delays") {
            view.setImageResource(R.drawable.nmbs)
        } else if (name == "Waze Alerts") {
            view.setImageResource(R.drawable.waze)
        } else {
            view.setImageResource(R.drawable.coyote)
        }
    }

}