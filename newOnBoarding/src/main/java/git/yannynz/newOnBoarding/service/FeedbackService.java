package git.yannynz.newOnBoarding.service;

import git.yannynz.newOnBoarding.model.Feedback;
import git.yannynz.newOnBoarding.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    // Método para contar feedbacks por quantidade de estrelas
    public Map<Integer, Integer> getFeedbackCountByStars() {
        List<Feedback> feedbacks = feedbackRepository.findAll();
        Map<Integer, Integer> starCount = new HashMap<>();

        for (Feedback feedback : feedbacks) {
            int rating = feedback.getRating();
            starCount.put(rating, starCount.getOrDefault(rating, 0) + 1);
        }

        return starCount;
    }

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll(); // Método para retornar todas as avaliações
    }
}

