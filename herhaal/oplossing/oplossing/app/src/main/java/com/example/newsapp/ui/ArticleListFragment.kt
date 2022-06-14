package com.example.newsapp.ui

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.databinding.ObservableField
import androidx.fragment.app.activityViewModels
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.newsapp.R
import com.example.newsapp.adapters.NewsItemAdapter
import com.example.newsapp.databinding.FragmentArticleListBinding
import kotlinx.android.synthetic.main.fragment_article_list.*

class ArticleListFragment : Fragment() {
    val vm: NewsViewModel by activityViewModels()
    val inputText = ObservableField<String>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val binding: FragmentArticleListBinding =
            DataBindingUtil.inflate(inflater, R.layout.fragment_article_list, container, false)
        binding.fragment = this

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val newsItemAdapter = NewsItemAdapter()
        vm.filteredNewsItems.observe(
            viewLifecycleOwner
        ) { list -> newsItemAdapter.submitList(list) }
        article_list.apply {
            layoutManager = LinearLayoutManager(activity)
            adapter = newsItemAdapter
        }
    }

    fun filter(view: View) {
        vm.filterNewsItems(inputText.get() ?: "")
    }
}