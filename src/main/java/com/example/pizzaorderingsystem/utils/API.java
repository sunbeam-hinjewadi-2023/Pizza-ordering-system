package com.example.pizzaorderingsystem.utils;
import com.example.pizzaorderingsystem.entity.Order;
import com.example.pizzaorderingsystem.entity.User;
import com.google.gson.JsonObject;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface API {
    String BASE_URL ="http://192.168.0.105:4001";

    @POST("/user/login")
    Call<JsonObject> loginUser(@Body User user);

    @POST("/user/register")
    Call<JsonObject> registerUser(@Body User user);

    @GET("/user/{id}")
    Call<JsonObject> getUserById(@Path("id")int id);
    @GET("/product/")
    Call<JsonObject> getAllPizzas();
    @POST ("/orders")
    Call<JsonObject> orders(@Body Order order);


    }
