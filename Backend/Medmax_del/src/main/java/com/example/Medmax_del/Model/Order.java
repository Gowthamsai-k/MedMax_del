package com.example.Medmax_del.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "orders")
public class Order {

    @Id
    private String id;
    private String email;
    private List<MedicineItem> items;
    private Address address;
    private double total;
    private String date;
    private String status;

    public Order() {
        this.status = "Pending"; // Default status
    }

    public Order(String email, List<MedicineItem> items, Address address, double total, String date) {
        this.email = email;
        this.items = items;
        this.address = address;
        this.total = total;
        this.date = date;
        this.status = "Pending";
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public List<MedicineItem> getItems() { return items; }
    public void setItems(List<MedicineItem> items) { this.items = items; }

    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
