package com.example.demo.controller;

import com.example.demo.domain.User;
import com.example.demo.dto.LoginRequest;
import com.example.demo.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    private final UserService userService = new UserService();

    // 회원가입
    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody User user) {
        Map<String, Object> res = new HashMap<>();
        boolean ok = userService.register(user);
        res.put("success", ok);
        res.put("message", ok ? "회원가입 성공" : "이미 존재하는 이메일");
        return res;
    }

    // 로그인
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest req, HttpSession session) {
        Map<String, Object> res = new HashMap<>();
        return userService.login(req.getEmail(), req.getPassword())
                .map(u -> {
                    session.setAttribute("user", u);
                    res.put("success", true);
                    res.put("user", u);
                    return res;
                })
                .orElseGet(() -> {
                    res.put("success", false);
                    res.put("message", "이메일 또는 비밀번호가 틀립니다.");
                    return res;
                });
    }

    // 로그아웃
    @PostMapping("/logout")
    public Map<String, Object> logout(HttpSession session) {
        session.invalidate();
        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("message", "로그아웃 성공");
        return res;
    }

    // 로그인 상태 확인
    @GetMapping("/me")
    public Map<String, Object> me(HttpSession session) {
        Map<String, Object> res = new HashMap<>();
        User user = (User) session.getAttribute("user");
        if (user != null) {
            res.put("loggedIn", true);
            res.put("user", user);
        } else {
            res.put("loggedIn", false);
        }
        return res;
    }
}
