package com.example.Medmax_del.service;
import com.example.Medmax_del.Model.*;
import com.example.Medmax_del.dto.*;
import com.example.Medmax_del.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

    

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    public Order createOrder(OrderRequest orderRequest) {
        // Step 1: Fetch the medicines
        List<Medicine> medicines = medicineRepository.findAllById(orderRequest.getMedicineIds());

        // Step 2: Create an order object
        Order order = new Order();
        order.setMedicines(medicines);
        order.setAddress(orderRequest.getAddress());
        order.setUserId(orderRequest.getUserId());
        order.setTotalAmount(calculateTotalAmount(medicines));
        order.setOrderStatus("Pending");

        // Step 3: Save the order to the database
        Order savedOrder = orderRepository.save(order);

        // Step 4: Reduce stock for each medicine
        reduceMedicineStock(medicines);

        return savedOrder;
    }

    private void reduceMedicineStock(List<Medicine> medicines) {
        for (Medicine medicine : medicines) {
            int updatedStock = medicine.getQuantity() - 1;  // Assuming quantity reduces by 1
            medicine.setQuantity(updatedStock);
            medicineRepository.save(medicine);  // Save updated medicine back to DB
        }
    }

    private double calculateTotalAmount(List<Medicine> medicines) {
        return medicines.stream().mapToDouble(Medicine::getPrice).sum();
    }
}