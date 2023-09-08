package com.example.pizzaorderingsystem.adapter;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.pizzaorderingsystem.R;
import com.example.pizzaorderingsystem.activity.DetailsActivity;
import com.example.pizzaorderingsystem.entity.Pizza;

import java.util.List;

public class PizzaListAdapter extends RecyclerView.Adapter <PizzaListAdapter.MyViewHolder> {
    Context context;
    List<Pizza> pizzaList;

    public PizzaListAdapter(Context context, List<Pizza> pizzaList) {
        this.context = context;
        this.pizzaList = pizzaList;
    }

    @NonNull
    @Override
    public PizzaListAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.pizza_list,null);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull PizzaListAdapter.MyViewHolder holder, int position) {
        Pizza pizza = pizzaList.get(position);
        holder.textName.setText(pizza.getTitle());
        holder.textCompany.setText(pizza.getCompany());
        holder.textPrice.setText(""+pizza.getPrice());
       holder.textDescription.setText(pizza.getDescription());
        Glide.with(context).load("http://192.168.222.94:4001/"+pizza.getImage()).into(holder.image);
    }

    @Override
    public int getItemCount() {
        return pizzaList.size();
    }

    class MyViewHolder extends RecyclerView.ViewHolder{
        ImageView image;
        TextView textName,textCompany,textPrice,textDescription;
        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            image = itemView.findViewById(R.id.image);
            textName = itemView.findViewById(R.id.textName);
            textCompany = itemView.findViewById(R.id.textCompany);
            textPrice = itemView.findViewById(R.id.textPrice);
           textDescription = itemView.findViewById(R.id.textDescription);
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(context, DetailsActivity.class);
                    intent.putExtra("pizza",pizzaList.get(getAdapterPosition()));
                    context.startActivity(intent);
                }
            });
        }
    }
}