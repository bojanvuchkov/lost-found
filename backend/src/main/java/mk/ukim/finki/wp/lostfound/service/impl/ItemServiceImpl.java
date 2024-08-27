package mk.ukim.finki.wp.lostfound.service.impl;

import jakarta.servlet.http.HttpServletRequest;
import mk.ukim.finki.wp.lostfound.model.Category;
import mk.ukim.finki.wp.lostfound.model.Item;
import mk.ukim.finki.wp.lostfound.model.User;
import mk.ukim.finki.wp.lostfound.model.enums.Status;
import mk.ukim.finki.wp.lostfound.model.exceptions.ItemNotFoundException;
import mk.ukim.finki.wp.lostfound.model.exceptions.UserNotFoundException;
import mk.ukim.finki.wp.lostfound.repository.ItemRepository;
import mk.ukim.finki.wp.lostfound.repository.UserRepository;
import mk.ukim.finki.wp.lostfound.service.ItemService;
import org.apache.commons.io.IOUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    public ItemServiceImpl(ItemRepository itemRepository, UserRepository userRepository) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Page<Item> listItems(Pageable pageable) {
        return itemRepository.findAll(pageable);

    }

    @Override
    public Page<Item> filter(String name, String isLost, String status, String category, Pageable pageable) {
        if (name == null && isLost == null && category == null && status == null)
            return itemRepository.findAllByStatus(Status.valueOf("OPEN"),pageable);
        else if(!name.isEmpty() && !Objects.equals(isLost, "All") && !category.equals("All") ) {
            return itemRepository.findByNameContainsIgnoreCaseAndByCategoryAndByLostAndStatus(name, Category.valueOf(category), Objects.equals(isLost, "Lost"), Status.valueOf(status), pageable);
        }
        else if(!name.isEmpty() && !Objects.equals(isLost, "All") && category.equals("All") ){
            return itemRepository.findByNameContainsIgnoreCaseAndByLostAndStatus(name,Objects.equals(isLost,"Lost"),Status.valueOf(status),pageable);
        }
        else if(!name.isEmpty() && Objects.equals(isLost, "All") && !category.equals("All") ){
            return itemRepository.findByNameContainsIgnoreCaseAndCategoryAndStatus(name, Category.valueOf(category),Status.valueOf(status),pageable);
        }
        else if(!name.isEmpty() && Objects.equals(isLost, "All") && category.equals("All") ){
            return itemRepository.findByNameContainsIgnoreCaseAndStatus(name,Status.valueOf(status),pageable);
        }
        else if(name.isEmpty() && Objects.equals(isLost, "All") && category.equals("All") ){
            return itemRepository.findAllByStatus(Status.valueOf(status),pageable);
        }
        else if(name.isEmpty() && !Objects.equals(isLost, "All") && category.equals("All") ){
            return itemRepository.findAllByLostAndStatus(Objects.equals(isLost,"Lost"),Status.valueOf(status),pageable);
        }
        else if(name.isEmpty() && Objects.equals(isLost, "All") && !category.equals("All") ){
            return itemRepository.findByCategoryAndStatus(Category.valueOf(category),Status.valueOf(status),pageable);
        }
        else if(name.isEmpty() && !Objects.equals(isLost, "All") && !category.equals("All") ){
            return itemRepository.findByCategoryAndByLostAndStatus(Category.valueOf(category),Objects.equals(isLost,"Lost"),Status.valueOf(status),pageable);
        }
        return null;
    }

    @Override
    public Optional<Item> findById(Long id) {
        return itemRepository.findById(id);
    }

    @Override
    public Item create(HttpServletRequest request, String name, String description, String isLost, Category category, MultipartFile file, String location) {
        boolean lost = Objects.equals(isLost, "Lost");
        //TODO uncomment when login works
//        String username = request.getUserPrincipal().getName();
//        User user = userRepository.findById(username).orElseThrow(UserNotFoundException::new);
        User user = userRepository.findById("riste.stojanov").orElseThrow(UserNotFoundException::new);
        Item item = null;
        try {
            byte[] imageBytes = IOUtils.toByteArray(new URL("https://clipground.com/images/no-image-png-5.jpg"));
            item = new Item(name, description, lost, category, !file.isEmpty() ? file.getBytes() : imageBytes, location, user);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return itemRepository.save(item);
    }

    @Override
    public Item update(Long id, String name, String description, String isLost, String status, Category category, MultipartFile file, String location) {
       boolean lost = Objects.equals(isLost, "Lost");
        Item item = this.findById(id).orElseThrow(ItemNotFoundException::new);
        item.setName(name);
        item.setDescription(description);
        item.setLost(lost);
        item.setCategory(category);
        Status status1 = Status.valueOf(status);
        item.setStatus(status1);
        if (status1.equals(Status.RESOLVED))
            item.setDateResolved(LocalDateTime.now());
        if (!file.isEmpty()) {
            try {
                item.setImage(file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        item.setLocation(location);
        return itemRepository.save(item);
    }

    @Override
    public void delete(Long id) {
        itemRepository.deleteById(id);
    }
}
