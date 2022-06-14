package com.example.trafficfeed.ui

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.activity.viewModels
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import com.example.trafficfeed.R
import com.example.trafficfeed.databinding.ActivityMainBinding
import com.example.trafficfeed.db.ViewModel

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val vm: ViewModel by viewModels();
        val binding: ActivityMainBinding =
            DataBindingUtil.setContentView(this, R.layout.activity_main)

        binding.viewmodel = vm
        binding.lifecycleOwner = this

        vm.notificationCount.observe(this, Observer{ })
    }
}