package com.example.newsapp.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.newsapp.databinding.ArticleViewBinding
import com.example.newsapp.db.model.NewsItem

class NewsItemAdapter :
    ListAdapter<NewsItem, NewsItemAdapter.NewsItemViewHolder>(NewsItemDiffCallback()) {

    class NewsItemViewHolder(val binding: ArticleViewBinding) :
        RecyclerView.ViewHolder(binding.root) {
        companion object {
            fun from(parent: ViewGroup): NewsItemViewHolder {
                val layoutInflater = LayoutInflater.from(parent.context)
                val binding = ArticleViewBinding.inflate(layoutInflater, parent, false)
                return NewsItemViewHolder(binding)
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NewsItemViewHolder {
        return NewsItemViewHolder.from(parent)
    }

    override fun onBindViewHolder(holder: NewsItemViewHolder, position: Int) {
        val newsItem: NewsItem = getItem(position)
        holder.binding.newsItem = newsItem
        holder.binding.executePendingBindings()
    }
}