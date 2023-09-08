package com.example.pizzaorderingsystem.entity;

import java.io.Serializable;

public class Pizza implements Serializable {
    private int id;
    private String title;
    private double price;
    private String company;
    private String image;
    private String description;

    public Pizza() {
    }

    public Pizza(int id, String title, double price, String company, String image, String description) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.company = company;
        this.image = image;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Pizza{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", price=" + price +
                ", company='" + company + '\'' +
                ", image='" + image + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
