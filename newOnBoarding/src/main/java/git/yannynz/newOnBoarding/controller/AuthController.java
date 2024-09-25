package git.yannynz.newOnBoarding.controller;

import git.yannynz.newOnBoarding.model.User;
import git.yannynz.newOnBoarding.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user) {
        System.out.println("Register method called");
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "Email already in use."));
        }
        if (user.getName() == null || user.getEmail() == null || user.getPassword() == null || user.getRole() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "All fields are required."));
        }
        String hashedPassword = userService.hashPassword(user.getPassword());
        user.setPassword(hashedPassword);
        userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Cadastrado com sucesso"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        System.out.println("Login method called");

        if (authHeader == null || !authHeader.startsWith("Basic ")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Authorization header missing or malformed");
        }

        String[] credentials;
        try {
            credentials = extractCredentials(authHeader);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Authorization header format");
        }

        String email = credentials[0];
        String password = credentials[1];

        Optional<User> user = userService.findByEmail(email);
        if (user.isPresent() && userService.checkPassword(password, user.get().getPassword())) {
            User loggedInUser = user.get();
            System.out.println("First Access: " + loggedInUser.isFirstAccess());
            // Adiciona o userId à resposta
            return ResponseEntity.ok(Map.of(
                    "id", loggedInUser.getId(),
                    "name", loggedInUser.getName(),
                    "role", loggedInUser.getRole(),
                    "token", "some-generated-token",
                    "firstAccess", loggedInUser.isFirstAccess(),// Adicione isso
                    "firstAccess2", loggedInUser.isFirstAccess2() // Adicione esta linha
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    // Novo endpoint para atualizar o firstAccess
    @PutMapping("/{id}/firstAccess")
    public ResponseEntity<String> updateFirstAccess(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
        Optional<User> userOpt = userService.findById(id);
        System.out.println("Update method called");

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            Boolean firstAccess = body.get("firstAccess");
            if (firstAccess != null) {
                user.setFirstAccess(firstAccess);
                userService.saveUser(user);
                return ResponseEntity.ok("First access updated successfully");
            } else {
                return ResponseEntity.badRequest().body("Invalid request body");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }



    private String[] extractCredentials(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Basic ")) {
            String base64Credentials = authHeader.substring(6);
            byte[] decodedBytes = Base64.getDecoder().decode(base64Credentials);
            String credentials = new String(decodedBytes);
            return credentials.split(":", 2); // Divide em email e senha
        } else {
            throw new IllegalArgumentException("Invalid Authorization header");
        }
    }
}
