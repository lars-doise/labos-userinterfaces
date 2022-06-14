package com.example.newsapp.ui

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import androidx.navigation.Navigation
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.newsapp.R
import com.example.newsapp.adapters.CategoryAdapter
import com.example.newsapp.db.model.Category
import kotlinx.android.synthetic.main.fragment_overview.*

class OverviewFragment : Fragment() {
    val vm: NewsViewModel by activityViewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_overview, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val categoryAdapter = CategoryAdapter()
        vm.categories.observe(
            viewLifecycleOwner
        ) { list -> categoryAdapter.submitList(list) }
        overview_list.apply {
            layoutManager = LinearLayoutManager(activity)
            adapter = categoryAdapter
        }
    }
}