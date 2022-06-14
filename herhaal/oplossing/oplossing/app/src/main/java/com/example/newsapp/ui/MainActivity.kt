package com.example.newsapp.ui

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.activity.viewModels
import androidx.navigation.Navigation
import androidx.navigation.findNavController
import com.example.newsapp.R

class MainActivity : AppCompatActivity() {
    val vm: NewsViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        vm.categoryCount.observe(this, {})
        vm.newsItemCount.observe(this, {})
    }

    fun showSubCategories(view: View) {
        vm.selectCategory(view.tag.toString())
        Navigation.findNavController(view)
            .navigate(R.id.action_overviewFragment_to_subCategoryFragment)
    }

    fun showArticles(view: View) {
        vm.selectSubCategory(view.tag.toString())
        Navigation.findNavController(view)
            .navigate(R.id.action_subCategoryFragment_to_articleListFragment)
    }

    fun showDetails(view: View) {
        vm.selectNewsItem(view.tag.toString())
        Navigation.findNavController(view)
            .navigate(R.id.action_articleListFragment_to_detailFragment)
    }
}