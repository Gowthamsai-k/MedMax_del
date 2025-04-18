package com.example.Medmax_del.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.Medmax_del.Model.*;
import com.example.Medmax_del.Repository.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@CrossOrigin(origins = "http://localhost:5173") // Adjust if using different frontend port
public class AddressController {

    @Autowired
    private AddressRepository addressRepo;

    @GetMapping
    public List<Address> getAllAddresses() {
        return addressRepo.findAll();
    }

    @PostMapping
    public Address addAddress(@RequestBody Address address) {
        return addressRepo.save(address);
    }
}

