package com.example.Medmax_del.dto;


import java.util.List;

public class OrderRequest {

    private List<String> medicineIds;  // Medicine IDs in the order
    private String address;  // Shipping address
    private String userId;  // User ID placing the order

    // Getters and setters

    public List<String> getMedicineIds() {
        return medicineIds;
    }

    public void setMedicineIds(List<String> medicineIds) {
        this.medicineIds = medicineIds;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}