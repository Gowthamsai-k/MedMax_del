package com.example.Medmax_del.Repository;

import com.example.Medmax_del.Model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByEmail(String email);
}
