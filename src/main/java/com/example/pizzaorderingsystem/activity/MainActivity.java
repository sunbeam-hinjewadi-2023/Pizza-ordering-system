package com.example.pizzaorderingsystem.activity;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.viewpager2.widget.ViewPager2;

import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;


import com.example.pizzaorderingsystem.R;
import com.example.pizzaorderingsystem.adapter.PizzaFragementAdapter;
import com.google.android.material.tabs.TabLayout;
import com.google.android.material.tabs.TabLayoutMediator;

public class MainActivity extends AppCompatActivity {
    Toolbar toolBar;
    ViewPager2 viewPager2;
    TabLayout tabLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        toolBar = findViewById(R.id.toolBar);
        viewPager2 = findViewById(R.id.viewPager2);
        tabLayout = findViewById(R.id.tabLayout);
        setSupportActionBar(toolBar);
        PizzaFragementAdapter  pizzaFragementAdapter= new PizzaFragementAdapter(this);
        viewPager2.setAdapter(pizzaFragementAdapter);


        new TabLayoutMediator(tabLayout, viewPager2, new TabLayoutMediator.TabConfigurationStrategy() {
            @Override
            public void onConfigureTab(@NonNull TabLayout.Tab tab, int position) {
                switch (position){
                    case 0:
                        tab.setIcon(R.drawable.list);
                        break;
                    case 1:
                        tab.setIcon(R.drawable.order);
                        break;
                    case 2:
                        tab.setIcon(R.drawable.profile);
                        break;

                }
            }
        }).attach();

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main_menu,menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        getSharedPreferences("mobileStore",MODE_PRIVATE).edit().putBoolean("login_status",false).apply();
        finish();
        return super.onOptionsItemSelected(item);
    }
}
