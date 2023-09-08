package com.example.pizzaorderingsystem.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.pizzaorderingsystem.R;
import com.example.pizzaorderingsystem.entity.Order;
import com.example.pizzaorderingsystem.entity.Pizza;
import com.example.pizzaorderingsystem.utils.API;
import com.example.pizzaorderingsystem.utils.RetrofitClient;
import com.google.gson.JsonObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DetailsActivity extends AppCompatActivity {
    TextView textName,textPrice, textDescription;
    ImageView imageView;
    Pizza pizza;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_deatiles);
        textName = findViewById(R.id.textName);
        textPrice = findViewById(R.id.textPrice);
        textDescription = findViewById(R.id.textDescription);
        imageView = findViewById(R.id.imageView);
        pizza =(Pizza) getIntent().getSerializableExtra("pizza");

        getMobileDetails();
    }

    private void getMobileDetails() {
        textName.setText("Title  :"+pizza.getTitle());
        textPrice.setText("Price  :"+pizza.getPrice());
        textDescription.setText("Description :" +pizza.getDescription());
        Glide.with(this).load(API.BASE_URL+"/"+pizza.getImage()).into(imageView);
    }

    public void buy(View view){
        int userId = getSharedPreferences("mobileStore",MODE_PRIVATE).getInt("uid",0);
        int productId = pizza.getId();
        Order order = new Order();
        order.setUserId(userId);
        order.setProductId(productId);
        RetrofitClient.getInstance().getApi().orders(order).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if(response.body().getAsJsonObject().get("status").getAsString().equals("success")){
                    Toast.makeText(DetailsActivity.this, "Order Placed", Toast.LENGTH_SHORT).show();
                    finish();
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                Toast.makeText(DetailsActivity.this, "Something went wrong", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
