package com.example.newsapp.ui

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.activityViewModels
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.newsapp.R
import com.example.newsapp.adapters.SubCategoryAdapter
import kotlinx.android.synthetic.main.fragment_sub_category.*

class SubCategoryFragment : Fragment() {
    val vm: NewsViewModel by activityViewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_sub_category, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val subCategoryAdapter = SubCategoryAdapter()
        vm.subCategories.observe(
            viewLifecycleOwner
        ) { list -> subCategoryAdapter.submitList(list) }
        subcategory_list.apply {
            layoutManager = LinearLayoutManager(activity)
            adapter = subCategoryAdapter
        }
    }
}