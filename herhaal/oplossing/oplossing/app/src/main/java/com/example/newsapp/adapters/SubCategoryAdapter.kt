package com.example.newsapp.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.newsapp.databinding.SubcategoryViewBinding

class SubCategoryAdapter :
    ListAdapter<String, SubCategoryAdapter.SubCategoryViewHolder>(SubCategoryDiffCallback()){
        class SubCategoryViewHolder(val binding: SubcategoryViewBinding) : RecyclerView.ViewHolder(binding.root){
            companion object{
                fun from(parent: ViewGroup):SubCategoryViewHolder{
                    val layoutInflater = LayoutInflater.from(parent.context)
                    val binding = SubcategoryViewBinding.inflate(layoutInflater, parent, false)
                    return SubCategoryViewHolder(binding)
                }
            }
        }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SubCategoryViewHolder {
        return SubCategoryViewHolder.from(parent)
    }

    override fun onBindViewHolder(holder: SubCategoryViewHolder, position: Int) {
        val subCategory: String = getItem(position)
        holder.binding.subcategory = subCategory
        holder.binding.executePendingBindings()
    }
}