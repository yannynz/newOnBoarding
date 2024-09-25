package git.yannynz.newOnBoarding.model;

import git.yannynz.newOnBoarding.model.Feedback; 
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference; // Adicionar import

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String role;

    @Column(name = "first_access")
    private boolean firstAccess = true; // Adicionado o campo FirstAccess


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Evita recursão infinita
    private List<Reminder> reminders = new ArrayList<>();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Evita recursão infinita
 
    private List<Feedback> feedbacks = new ArrayList<>();

    // Construtor padrão vazio
    public User() {
    }

    // Construtor com id (não recomendado sem propósito)
    public User(Long userId) {
        this.id = userId;
    }

    // Construtor sem id (recomendado para criação de novos objetos)
    public User(String email, String encodedPassword, String name, String role) {
        this.email = email;
        this.password = encodedPassword;
        this.name = name;
        this.role = role;
    }

    // Getters e Setters
    public boolean isFirstAccess() {
        return firstAccess;
    }

    public void setFirstAccess(boolean firstAccess) {
        this.firstAccess = firstAccess;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<Reminder> getReminders() {
        return reminders;
    }

    public void setReminders(List<Reminder> reminders) {
        this.reminders = reminders;
    }

    public void setFeedbacks(List<Feedback> feedbacks) {
    this.feedbacks = feedbacks;
    }

    public List<Feedback> getFeedbacks() {
    return feedbacks;
    }
}
