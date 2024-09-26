package git.yannynz.newOnBoarding.service;

import git.yannynz.newOnBoarding.model.User;
import git.yannynz.newOnBoarding.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String hashPassword(String plainPassword) {
        return passwordEncoder.encode(plainPassword);
    }

    public boolean checkPassword(String plainPassword, String hashedPassword) {
        return passwordEncoder.matches(plainPassword, hashedPassword);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User registerUser(String email, String password, String name, String role) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(password);

        User user = new User(email, encodedPassword, name, role);
        return userRepository.save(user);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public Map<String, Integer> getUserCountByRoles() {
        List<User> users = userRepository.findAll();
        Map<String, Integer> roleCount = new HashMap<>();

        for (User user : users) {
            String role = user.getRole();
            roleCount.put(role, roleCount.getOrDefault(role, 0) + 1);
        }

        return roleCount;
    }

    public List<User> searchUsers(String name, String email, Long id, String role) {
        // Cria uma lista vazia para armazenar os resultados filtrados
        List<User> filteredUsers = new ArrayList<>();

        // Obtém todos os usuários
        List<User> allUsers = userRepository.findAll();

        // Filtra os usuários com base nos parâmetros fornecidos
        for (User user : allUsers) {
            boolean matches = true; // Variável que indica se o usuário corresponde aos critérios

            if (name != null && !name.isEmpty() && !user.getName().toLowerCase().contains(name.toLowerCase())) {
                matches = false; // Não corresponde ao nome
            }
            if (email != null && !email.isEmpty() && !user.getEmail().toLowerCase().contains(email.toLowerCase())) {
                matches = false; // Não corresponde ao e-mail
            }
            if (id != null && !user.getId().equals(id)) {
                matches = false; // Não corresponde ao ID
            }
            if (role != null && !role.isEmpty() && !user.getRole().equalsIgnoreCase(role)) {
                matches = false; // Não corresponde à role
            }

            // Se o usuário corresponder a todos os critérios, adiciona à lista de resultados
            if (matches) {
                filteredUsers.add(user);
            }
        }

        return filteredUsers; // Retorna a lista de usuários filtrados
    }

}

