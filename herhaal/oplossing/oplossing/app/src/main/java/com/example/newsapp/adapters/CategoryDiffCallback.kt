package com.example.newsapp.adapters

import androidx.recyclerview.widget.DiffUtil
import com.example.newsapp.db.model.Category

class CategoryDiffCallback:DiffUtil.ItemCallback<Category>() {
    override fun areItemsTheSame(oldItem: Category, newItem: Category): Boolean {
        return oldItem.id == newItem.id
    }

    override fun areContentsTheSame(oldItem: Category, newItem: Category): Boolean {
        return oldItem == newItem
    }

}