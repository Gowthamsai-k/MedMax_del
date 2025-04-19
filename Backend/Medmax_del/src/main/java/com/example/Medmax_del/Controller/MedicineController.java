package com.example.Medmax_del.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.Medmax_del.Model.Medicine;
import com.example.Medmax_del.Repository.MedicineRepository;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "*")
public class MedicineController {

    @Autowired
    private MedicineRepository repository;

    // Fetch all medicines
    @GetMapping
    public List<Medicine> getAllMedicines() {
        return repository.findAll();
    }

    // Add new medicine
    @PostMapping
    public Medicine addMedicine(@RequestBody Medicine medicine) {
        return repository.save(medicine);
    }
}
