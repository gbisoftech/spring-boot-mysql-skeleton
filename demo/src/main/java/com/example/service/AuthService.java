package com.example.service;

import com.example.model.Role;
import com.example.model.User;
import com.example.repository.UserRepository;
import com.example.security.JwtUtil;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import com.example.dto.request.*;
import com.example.dto.response.AuthResponse;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final UserRepository userRepository;
  private final JwtUtil jwtUtil;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;

  public AuthResponse register(RegisterRequest request) {
    System.out.println("---------register request-----------");
    System.out.println(request);
    User user = User.builder()
        .username(request.getUsername())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(Role.USER)
        .build();
    userRepository.save(user);
    var jwtToken = jwtUtil.generateToken(user);
    return AuthResponse.builder()
        .token(jwtToken)
        .user(user)
        .build();
  }

  public AuthResponse authenticate(AuthRequest request) {
    System.out.println("---------login request-----------");
    System.out.println(request.getEmail());

    Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
        request.getEmail(),
        request.getPassword()));
    System.out.print("authentication created");

    var user = (User) authentication.getPrincipal();
    // System.out.println(user);

    // Generate JWT token
    var jwtToken = jwtUtil.generateToken(user);
    // System.out.println(jwtToken);
    return AuthResponse.builder()
        .token(jwtToken)
        .user(user)
        .build();
  }

  // Read by ID
  public User getProfile(String email) {
    return userRepository.findByEmail(email)
        .orElseThrow();
  }

  // Update
  public String changePassword(String email, ChangePasswordRequest request) {
    var user = userRepository.findByEmail(email)
        .orElseThrow();
    if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
      throw new Error("failed: oldPassword do not match");
    }
    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
    userRepository.save(user);
    return "success: password changed";
  }

}
