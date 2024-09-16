package mk.ukim.finki.wp.lostfound.repository;

import mk.ukim.finki.wp.lostfound.model.Category;
import mk.ukim.finki.wp.lostfound.model.Item;
import mk.ukim.finki.wp.lostfound.model.User;
import mk.ukim.finki.wp.lostfound.model.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaSpecificationRepository<Item, Long>{
    Page<Item> findAll(Pageable pageable);

    Page<Item> findByNameContainsIgnoreCaseAndStatus(String name, Status status, Pageable pageable);

    Page<Item> findByCategoryAndStatus(Category category, Status status, Pageable pageable);

    @Query("select i from Item i WHERE i.isLost=?1 and i.status=?2")
    Page<Item> findAllByLostAndStatus(Boolean lost,Status status, Pageable pageable);

    Page<Item> findByNameContainsIgnoreCaseAndCategoryAndStatus(String name, Category category, Status status, Pageable pageable);

    @Query("select i from Item i WHERE i.name = ?1 and i.isLost = ?2 and i.status=?3")
    Page<Item> findByNameContainsIgnoreCaseAndByLostAndStatus(String name, Boolean lost,Status status, Pageable pageable);

    @Query("select i from Item i WHERE i.category = ?1 and i.isLost = ?2 and i.status=?3")
    Page<Item> findByCategoryAndByLostAndStatus(Category category, Boolean lost, Status status, Pageable pageable);

    @Query("select i from Item i WHERE i.name=?1 and i.category = ?2 and i.isLost = ?3 and i.status=?4")
    Page<Item> findByNameContainsIgnoreCaseAndByCategoryAndByLostAndStatus(String name, Category category, Boolean lost, Status status, Pageable pageable);

    Page<Item> findAllByStatus(Status status, Pageable pageable);

    List<Item> findAllByUser(User user);

    @Query(value = "SELECT * FROM item WHERE LOWER(description) ILIKE LOWER(CONCAT('%', :description, '%')) AND category = :category AND is_lost = true", nativeQuery = true)
    List<Item> findAllByDescriptionContainingIgnoreCaseAndCategoryAndIsLostTrue(String description, String category);
}
