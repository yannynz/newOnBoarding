package git.yannynz.newOnBoarding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import git.yannynz.newOnBoarding.model.Reminder;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {
    List<Reminder> findByUserId(Long userId);
}
