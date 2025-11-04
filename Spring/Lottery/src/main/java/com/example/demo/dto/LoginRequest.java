package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginRequest {
    public String email; // ID로할건지 Email로 로그인할 건지일단 보류 
    public String password;
}
