package com.example.Medmax_del.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "addresses")
public class Address {
    @Id
    private String id;
    private String address;

    // Constructors
    public Address() {}
    public Address(String address) {
        this.address = address;
    }

    // Getters and Setters
    public String getId() { return id; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
