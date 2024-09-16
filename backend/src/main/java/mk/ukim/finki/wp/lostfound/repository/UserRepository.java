package mk.ukim.finki.wp.lostfound.repository;

import mk.ukim.finki.wp.lostfound.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaSpecificationRepository<User, String> {
    Optional<User> findByEmail(String email);
    List<User> findTop10ByOrderByPointsDesc();
}
