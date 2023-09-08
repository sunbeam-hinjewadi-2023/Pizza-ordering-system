package com.example.pizzaorderingsystem.fragements;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.pizzaorderingsystem.R;
import com.example.pizzaorderingsystem.adapter.PizzaListAdapter;
import com.example.pizzaorderingsystem.entity.Pizza;
import com.example.pizzaorderingsystem.utils.RetrofitClient;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link PizzaListFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class PizzaListFragment extends Fragment {

  RecyclerView recyclerView;
  PizzaListAdapter pizzaListAdapter;
  List<Pizza> pizzaList;



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_pizza_list, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        recyclerView = view.findViewById(R.id.recyclerView);
        pizzaList = new ArrayList<>();
        pizzaListAdapter = new PizzaListAdapter(getContext(),pizzaList);
        recyclerView.setAdapter(pizzaListAdapter);
        recyclerView.setLayoutManager(new GridLayoutManager(getContext(),1));
        getAllPizzas();
    }
    private  void  getAllPizzas(){
        RetrofitClient.getInstance().getApi().getAllPizzas().enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if(response.body().getAsJsonObject().get("status").getAsString().equals("success")){
                    JsonArray jsonArray = response.body().getAsJsonObject().get("data").getAsJsonArray();
                    for (JsonElement element :jsonArray) {
                        Pizza pizza = new Pizza();
                        pizza.setId(element.getAsJsonObject().get("id").getAsInt());
                        pizza.setTitle(element.getAsJsonObject().get("title").getAsString());
                        pizza.setCompany(element.getAsJsonObject().get("company").getAsString());
                        pizza.setDescription(element.getAsJsonObject().get("description").getAsString());
                        pizza.setPrice(element.getAsJsonObject().get("price").getAsDouble());
                        pizza.setImage(element.getAsJsonObject().get("image").getAsString());
                        pizzaList.add(pizza);
                        pizzaListAdapter.notifyDataSetChanged();

                    }
                }

            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                Toast.makeText(getContext(), "Something went wrong", Toast.LENGTH_SHORT).show();
            }
        });
    }


}



