package com.example.newsapp.adapters

import androidx.recyclerview.widget.DiffUtil
import com.example.newsapp.db.model.Category
import com.example.newsapp.db.model.NewsItem

class NewsItemDiffCallback:DiffUtil.ItemCallback<NewsItem>() {
    override fun areItemsTheSame(oldItem: NewsItem, newItem: NewsItem): Boolean {
        return oldItem.id == newItem.id
    }

    override fun areContentsTheSame(oldItem: NewsItem, newItem: NewsItem): Boolean {
        return oldItem == newItem
    }
}