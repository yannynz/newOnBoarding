package git.yannynz.newOnBoarding.service;

import git.yannynz.newOnBoarding.model.Feedback;
import git.yannynz.newOnBoarding.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public List<Feedback> getFeedbacksByUser(Long userId) {
        return feedbackRepository.findByUserId(userId);
    }

    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }
}

