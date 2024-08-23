package git.yannynz.newOnBoarding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import git.yannynz.newOnBoarding.model.Reminder;
import git.yannynz.newOnBoarding.model.User;
import git.yannynz.newOnBoarding.service.ReminderService;

@RestController
@RequestMapping("/api/reminders")
public class ReminderController {

    @Autowired
    private ReminderService reminderService;

    @GetMapping("/user/{userId}")
    public List<Reminder> getRemindersByUser(@PathVariable Long userId) {
        return reminderService.getRemindersByUser(userId);
    }

    @PostMapping("/user/{userId}")
    public Reminder createReminder(@PathVariable Long userId, @RequestBody Reminder reminder) {
        reminder.setUser(new User(userId));
        return reminderService.createReminder(reminder);
    }

    @PutMapping("/{id}")
    public Reminder updateReminder(@PathVariable Long id, @RequestBody Reminder reminderDetails) {
        return reminderService.updateReminder(id, reminderDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReminder(@PathVariable Long id) {
        reminderService.deleteReminder(id);
        return ResponseEntity.ok().build();
    }
}

