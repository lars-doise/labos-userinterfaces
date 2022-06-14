package com.example.trafficfeed

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.activityViewModels
import androidx.navigation.Navigation
import com.example.trafficfeed.ui.TrafficViewModel


class MainFragment : Fragment() {
    val vm: TrafficViewModel by activityViewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding: FragmentMainBinding =
            DataBindingUtil.inflate(
                inflater, R.layout.fragment_main,
                container, false
            )

        // set binding variables
        binding.fragment = this;
        binding.lifecycleOwner = this

        return binding.getRoot()
    }
    fun goToDetail(view: View) {
        // select random notification
        vm.random()

        // go to detail fragment
        if (activity?.findViewById<View>(R.id.fragmentContainerView) != null) {
            Navigation.findNavController(view).navigate(R.id.action_mainFragment_to_detailFragment)
        }
    }

}