package mk.ukim.finki.wp.lostfound.web.rest;

import jakarta.servlet.http.HttpServletRequest;
import mk.ukim.finki.wp.lostfound.model.Category;
import mk.ukim.finki.wp.lostfound.model.Item;
import mk.ukim.finki.wp.lostfound.service.ItemService;
import mk.ukim.finki.wp.lostfound.service.UserService;
import mk.ukim.finki.wp.lostfound.model.exceptions.ItemNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/items")
public class ItemRestController {

    private final ItemService itemService;
    private final UserService userService;


    public ItemRestController(ItemService itemService, UserService userService) {
        this.itemService = itemService;
        this.userService = userService;
    }


    @GetMapping
    public Page<Item> getItemsPage(@RequestParam(required = false, defaultValue = "1") int pageNum,
                                   @RequestParam(required = false, defaultValue = "10") int size,
                                   @RequestParam(required = false) String name,
                                   @RequestParam(required = false) String isLost,
                                   @RequestParam(required = false) String category,
                                   @RequestParam(required = false) String status
    ) {

        return itemService.filter(name, isLost, status, category,
                PageRequest.of(pageNum - 1, size, Sort.by(Sort.Direction.DESC, "dateRegistered")));
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        try {
            this.itemService.delete(id);
            return ResponseEntity.noContent().build();
        }
        catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> saveItem(HttpServletRequest request,
                                           @RequestParam String name,
                                           @RequestParam String description,
                                           @RequestParam String isLost,
                                           @RequestParam String category,
                                           @RequestParam(required = false) MultipartFile file,
                                           @RequestParam String location) {
        try {
            this.itemService.create(request, name, description, isLost, Category.valueOf(category), file, location);
            return new ResponseEntity<>("Item created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create item: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<?> editItem(
            @PathVariable("id") Long id,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String isLost,
            @RequestParam Category category,
            @RequestParam String status,
            @RequestParam(required = false) MultipartFile file,
            @RequestParam String location) {
        try {
            Item item = itemService.update(id, name, description, isLost, status, category, file, location);
            return ResponseEntity.ok(item);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}


