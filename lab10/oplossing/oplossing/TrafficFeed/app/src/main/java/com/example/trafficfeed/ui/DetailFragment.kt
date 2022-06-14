package com.example.trafficfeed.ui

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.activityViewModels
import com.example.trafficfeed.R
import com.example.trafficfeed.databinding.FragmentDetailBinding


class DetailFragment : Fragment() {
    val vm: TrafficViewModel by activityViewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding: FragmentDetailBinding =
            DataBindingUtil.inflate(inflater, R.layout.fragment_detail,
                container, false)

        // set binding variable
        binding.viewmodel = vm
        binding.lifecycleOwner = this
        
        return binding.getRoot()
    }
}