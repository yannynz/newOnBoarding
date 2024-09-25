package git.yannynz.newOnBoarding.controller;

import git.yannynz.newOnBoarding.model.User;
import git.yannynz.newOnBoarding.service.FeedbackService;
import git.yannynz.newOnBoarding.service.UserService;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import git.yannynz.newOnBoarding.model.Feedback;



@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private UserService userService;

    // Método para atualizar o campo firstAccess2
    @PutMapping("/users/{id}/firstAccess2")
    public ResponseEntity<String> updateFirstAccess2(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
        Optional<User> userOpt = userService.findById(id);
        System.out.println("Update method for firstAccess2 called");

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            Boolean firstAccess2 = body.get("firstAccess2");
            if (firstAccess2 != null) {
                user.setFirstAccess2(firstAccess2);
                userService.saveUser(user);
                return ResponseEntity.ok("First access 2 updated successfully");
            } else {
                return ResponseEntity.badRequest().body("Invalid request body");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @GetMapping("/users/{userId}")
    public List<Feedback> getFeedbacksByUser(@PathVariable Long userId) {
        return feedbackService.getFeedbacksByUser(userId);
    }

    @PostMapping("/users/{userId}")
    public ResponseEntity<Feedback> createFeedback(@PathVariable Long userId, @RequestBody Feedback feedback) {
        User user = userService.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        feedback.setUser(user);
        return ResponseEntity.ok(feedbackService.createFeedback(feedback));
    }
}

