package git.yannynz.newOnBoarding.controller;

import git.yannynz.newOnBoarding.model.Feedback;
import git.yannynz.newOnBoarding.model.User;
import git.yannynz.newOnBoarding.service.FeedbackService;
import git.yannynz.newOnBoarding.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private UserService userService;

    @GetMapping("/user/{userId}")
    public List<Feedback> getFeedbacksByUser(@PathVariable Long userId) {
        return feedbackService.getFeedbacksByUser(userId);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Feedback> createFeedback(@PathVariable Long userId, @RequestBody Feedback feedback) {
        User user = userService.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        feedback.setUser(user);
        return ResponseEntity.ok(feedbackService.createFeedback(feedback));
    }
}

