package com.example.quizapp.adapters

import android.util.Log
import android.widget.ImageView
import androidx.databinding.BindingAdapter
import com.bumptech.glide.Glide

object ImageViewBindingAdapter {
    @BindingAdapter("imageRemoteUri")
    @JvmStatic
    fun getImageRemoteUri(imageView: ImageView, imageUri: String) {
        Glide.with(imageView.context)
            .load(imageUri)
            .into(imageView)
        Log.i("BINDINGADAPTER", "TEST")
    }
}