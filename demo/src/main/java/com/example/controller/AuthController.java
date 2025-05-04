package com.example.controller;

import com.example.dto.request.RegisterRequest;
import com.example.dto.request.AuthRequest;
import com.example.dto.request.ChangePasswordRequest;
import com.example.dto.response.AuthResponse;
import com.example.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

  @Autowired
  private AuthService authService;

  // Register User
  @PostMapping("/auth/register")
  public ResponseEntity<?> register(
      @RequestBody RegisterRequest request) {
    try {
      AuthResponse response = authService.register(request);
      return ResponseEntity.ok(response);
    } catch (Exception ex) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("An error occured at server: " + ex.getMessage());
    }
  }

  // Login User
  @PostMapping("/auth/login")
  public ResponseEntity<?> login(
      @RequestBody AuthRequest request) {
    try {
      AuthResponse response = authService.authenticate(request);
      return ResponseEntity.ok(response);
    } catch (Exception ex) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("An error occured: " + ex.getMessage());
    }
  }

  @GetMapping("/user")
  public ResponseEntity<?> getProfile() {
    try {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      String email = authentication.getName();
      System.out.println("--------------" + email);
      var response = authService.getProfile(email);
      return ResponseEntity.ok(response);
    } catch (Exception ex) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("An error occured: " + ex.getMessage());
    }
  }

  @PostMapping("/changePassword")
  public ResponseEntity<?> changePassword(
      @RequestBody ChangePasswordRequest request) {
    try {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      String email = authentication.getName();
      var response = authService.changePassword(email, request);
      return ResponseEntity.ok(response);
    } catch (Exception ex) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("An error occured: " + ex.getMessage());
    }
  }

}
