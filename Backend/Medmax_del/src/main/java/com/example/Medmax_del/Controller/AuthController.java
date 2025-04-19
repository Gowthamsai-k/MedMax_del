package com.example.Medmax_del.Controller;



import com.example.Medmax_del.Model.User;
import com.example.Medmax_del.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin (origins = "*") // Adjust if your frontend is hosted elsewhere
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return "Email already registered!";
        }
        userRepo.save(user);
        return "User registered successfully!";
    }

    @PostMapping("/login")
    public Object login(@RequestBody User loginUser) {
        Optional<User> found = userRepo.findByEmail(loginUser.getEmail());
        if (found.isPresent() && found.get().getPassword().equals(loginUser.getPassword())) {
            return new LoginResponse("Login successful", found.get().getType());
        }
        return new LoginResponse("Invalid credentials", null);
    }

    private record LoginResponse(String message, String type) {}
  


    
    
}

