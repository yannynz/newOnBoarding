package git.yannynz.newOnBoarding.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import git.yannynz.newOnBoarding.model.Reminder;
import git.yannynz.newOnBoarding.repository.ReminderRepository;

@Service
public class ReminderService {

    @Autowired
    private ReminderRepository reminderRepository;

    public List<Reminder> getRemindersByUser(Long userId) {
        return reminderRepository.findByUserId(userId);
    }

    public Reminder createReminder(Reminder reminder) {
        return reminderRepository.save(reminder);
    }

    public Reminder updateReminder(Long id, Reminder reminderDetails) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Reminder not found"));
        
        reminder.setTitle(reminderDetails.getTitle());
        reminder.setDescription(reminderDetails.getDescription());

        return reminderRepository.save(reminder);
    }

    public void deleteReminder(Long id) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Reminder not found"));
        reminderRepository.delete(reminder);
    }
}
