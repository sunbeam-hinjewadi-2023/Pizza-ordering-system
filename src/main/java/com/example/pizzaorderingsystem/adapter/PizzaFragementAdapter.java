package com.example.pizzaorderingsystem.adapter;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.viewpager2.adapter.FragmentStateAdapter;

import com.example.pizzaorderingsystem.fragements.OrdersFragment;
import com.example.pizzaorderingsystem.fragements.PizzaListFragment;
import com.example.pizzaorderingsystem.fragements.profileFragment;

public class PizzaFragementAdapter extends FragmentStateAdapter {
    public PizzaFragementAdapter(@NonNull FragmentActivity fragmentActivity) {
        super(fragmentActivity);
    }

    @NonNull
    @Override
    public Fragment createFragment(int position) {
        switch (position){
            case 0 :
                return  new PizzaListFragment();

            case 1 :
                return  new OrdersFragment();

            case 2 :
                return  new profileFragment();

        }
        return null;
    }

    @Override
    public int getItemCount() {
        return 3;
    }
}
