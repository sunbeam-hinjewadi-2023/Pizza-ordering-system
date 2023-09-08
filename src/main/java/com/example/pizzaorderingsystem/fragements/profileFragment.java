package com.example.pizzaorderingsystem.fragements;

import android.content.Context;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.pizzaorderingsystem.R;
import com.example.pizzaorderingsystem.utils.API;
import com.example.pizzaorderingsystem.utils.RetrofitClient;
import com.google.gson.JsonObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class profileFragment extends Fragment {
    TextView textFirstName,textLastName,textMobile;
    ImageView imageView;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_profile, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        textFirstName = view.findViewById(R.id.textFirstName);
        textLastName = view.findViewById(R.id.textLastName);
        textMobile = view.findViewById(R.id.textMobile);
        imageView = view.findViewById(R.id.imageView);

        getUserById();
    }

    private void getUserById() {
        int id = getContext().getSharedPreferences("pizzaStore", Context.MODE_PRIVATE).getInt("uid",0);
        RetrofitClient.getInstance().getApi().getUserById(id).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if(response.body().getAsJsonObject().get("status").getAsString().equals("success")){
                    JsonObject object = response.body().getAsJsonObject().get("data").getAsJsonArray().get(0).getAsJsonObject();
                    textFirstName.setText("Name : "+object.get("name").getAsString());
                    textLastName.setText("Email : "+object.get("email").getAsString());
                    textMobile.setText("Mobile : "+object.get("mobile").getAsString());

                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                Toast.makeText(getContext(), "something went wrong", Toast.LENGTH_SHORT).show();
            }
        });
    }

}