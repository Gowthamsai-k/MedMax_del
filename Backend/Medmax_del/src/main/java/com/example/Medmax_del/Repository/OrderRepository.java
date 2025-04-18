package com.example.Medmax_del.Repository;


    


import com.example.Medmax_del.Model.*;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
    // Additional custom queries, if necessary
}

