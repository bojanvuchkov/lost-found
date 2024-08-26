package mk.ukim.finki.wp.lostfound.repository;

import mk.ukim.finki.wp.lostfound.model.Email;
import mk.ukim.finki.wp.lostfound.model.User;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface EmailRepository extends JpaSpecificationRepository<Email, Long> {
    List<Email> findAllByReceiver(User user);
}
