package com.example.trafficfeed.ui

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Observer
import androidx.navigation.Navigation
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.trafficfeed.R
import com.example.trafficfeed.databinding.FragmentListBinding
import com.example.trafficfeed.db.model.TrafficNotification
import kotlinx.android.synthetic.main.fragment_list.*

class ListFragment : Fragment() {
    val viewModel: TrafficViewModel by activityViewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        val binding = FragmentListBinding.inflate(inflater, container, false)
        binding.lifecycleOwner = this
        binding.viewmodel = viewModel

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val notificationAdapater = TrafficNotificationAdapater()
        viewModel.notifications.observe(
            viewLifecycleOwner,
            Observer<List<TrafficNotification>> { list -> notificationAdapater.submitList(list) })
        notification_list.apply {
            layoutManager = LinearLayoutManager(activity)
            adapter = notificationAdapater
        }
    }
}
