package com.example.Medmax_del.Model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "Credentials")
public class User {
    @Id
    private String id;
    private String name;
    private String username;
    private String email;
    private String password;
    private String type; // customer or pharmacist
}
//setter and getter

