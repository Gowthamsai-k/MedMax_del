package com.example.Medmax_del.Controller;
import com.example.Medmax_del.Model.Medicine;
import com.example.Medmax_del.Model.MedicineItem;
import com.example.Medmax_del.Model.Order;
import com.example.Medmax_del.Repository.MedicineRepository;
import com.example.Medmax_del.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private MedicineRepository medicineRepo;

    @PostMapping("/orders")
    public String placeOrder(@RequestBody Order order) {
        // Validate order
        if (order.getItems() == null || order.getItems().isEmpty()) {
            return "Order must contain at least one item";
        }
        if (order.getEmail() == null || order.getEmail().isEmpty()) {
            return "Email is required";
        }
        if (order.getAddress() == null) {
            return "Delivery address is required";
        }

        // Check and update medicine stock
        for (MedicineItem item : order.getItems()) {
            Optional<Medicine> medicineOpt = medicineRepo.findById(item.getId());
            if (medicineOpt.isPresent()) {
                Medicine medicine = medicineOpt.get();
                if (medicine.getQuantity() >= item.getQuantity()) {
                    medicine.setQuantity(medicine.getQuantity() - item.getQuantity());
                    medicineRepo.save(medicine);
                } else {
                    return "Insufficient stock for: " + medicine.getName();
                }
            } else {
                return "Medicine with ID " + item.getId() + " not found!";
            }
        }

        try {
            // Set status and save order
            order.setStatus("Pending");
            orderRepo.save(order);
            return "Order placed successfully!";
        } catch (Exception e) {
            return "Error saving order: " + e.getMessage();
        }
    }

    @GetMapping("/orders")
    public List<Order> getOrdersByEmail(@RequestParam String email) {
        return orderRepo.findByEmail(email);
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        Optional<Order> order = orderRepo.findById(id);
        return order.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/orders/stats")
    public Map<String, Object> getOrderStats() {
        List<Order> allOrders = orderRepo.findAll();
        
        // Calculate total orders and earnings
        int totalOrders = allOrders.size();
        double totalEarnings = allOrders.stream()
                .mapToDouble(Order::getTotal)
                .sum();

        // Calculate monthly data
        Map<String, Map<String, Object>> monthlyData = new HashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;

        for (Order order : allOrders) {
            LocalDateTime orderDate = LocalDateTime.parse(order.getDate(), formatter);
            String month = orderDate.getMonth().toString().substring(0, 3);
            
            monthlyData.computeIfAbsent(month, _ -> new HashMap<>());
            Map<String, Object> monthStats = monthlyData.get(month);
            
            monthStats.merge("orders", 1, (oldValue, _) -> (int)oldValue + 1);
            monthStats.merge("earnings", order.getTotal(), (oldValue, newVal) -> 
                (double)oldValue + (double)newVal);
        }

        // Convert monthly data to list format for frontend
        List<Map<String, Object>> monthlyDataList = monthlyData.entrySet().stream()
            .map(entry -> {
                Map<String, Object> data = new HashMap<>();
                data.put("month", entry.getKey());
                data.put("orders", entry.getValue().get("orders"));
                data.put("earnings", entry.getValue().get("earnings"));
                return data;
            })
            .collect(Collectors.toList());

        // Calculate category distribution
        Map<String, Integer> categoryData = new HashMap<>();
        for (Order order : allOrders) {
            for (MedicineItem item : order.getItems()) {
                Optional<Medicine> medicine = medicineRepo.findById(item.getId());
                if (medicine.isPresent()) {
                    String type = medicine.get().getType();
                    categoryData.merge(type, item.getQuantity(), Integer::sum);
                }
            }
        }

        // Prepare response
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalOrders", totalOrders);
        stats.put("totalEarnings", totalEarnings);
        stats.put("monthlyData", monthlyDataList);
        stats.put("categoryData", categoryData.entrySet().stream()
            .map(entry -> {
                Map<String, Object> category = new HashMap<>();
                category.put("name", entry.getKey());
                category.put("value", entry.getValue());
                return category;
            })
            .collect(Collectors.toList()));

        return stats;
    }
}
