package mk.ukim.finki.wp.lostfound.web;

import jakarta.servlet.http.HttpServletRequest;
import mk.ukim.finki.wp.lostfound.model.Category;
import mk.ukim.finki.wp.lostfound.model.Item;
import mk.ukim.finki.wp.lostfound.model.exceptions.ItemNotFoundException;
import mk.ukim.finki.wp.lostfound.service.ItemService;
import mk.ukim.finki.wp.lostfound.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.format.DateTimeFormatter;
import java.util.*;

@Controller
@RequestMapping("/items")
public class ItemController {

    private final ItemService itemService;
    private final UserService userService;

    public ItemController(ItemService itemService, UserService userService) {
        this.itemService = itemService;
        this.userService = userService;
    }


    @GetMapping
    public String getItemsPage(@RequestParam(required = false, defaultValue = "1") int pageNum,
                               @RequestParam(required = false, defaultValue = "10") int size,
                               HttpServletRequest request,
                               Model model) {
        Page<Item> items = this.itemService.listItems(PageRequest.of(pageNum - 1, size,  Sort.by(Sort.Direction.DESC, "dateRegistered")));
        HashMap<Item, String> dateTimes = new HashMap<>();
        HashMap<Item, String> images = new HashMap<>();
        items.forEach(item -> {
            dateTimes.put(item, item.getDateRegistered().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm")));
            images.put(item, Base64.getEncoder().encodeToString(item.getImage()));
        });
        Category[] categories = Category.values();
        String username = request.getUserPrincipal().getName();
        model.addAttribute("username", username);
        model.addAttribute("items", items);
        model.addAttribute("images", images);
        model.addAttribute("dateTimes", dateTimes);
        model.addAttribute("categories", categories);
        return "items/list";
    }

    @PostMapping("/search")
    public String search(@RequestParam(required = false, defaultValue = "1") int pageNum,
                         @RequestParam(required = false, defaultValue = "10") int size,
                         @RequestParam String name,
                         @RequestParam String isLost,
                         @RequestParam String category,
                         @RequestParam String status,
                         HttpServletRequest request,
                         Model model) {
        Page<Item> items = this.itemService.filter(name, isLost, status, category, PageRequest.of(pageNum - 1, size, Sort.by(Sort.Direction.DESC, "dateRegistered")));
        HashMap<Item, String> dateTimes = new HashMap<>();
        HashMap<Item, String> images = new HashMap<>();
        items.forEach(item -> {
            dateTimes.put(item, item.getDateRegistered().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm")));
            images.put(item, Base64.getEncoder().encodeToString(item.getImage()));
        });

        Category[] categories = Category.values();
        String username = request.getUserPrincipal().getName();
        model.addAttribute("username", username);
        model.addAttribute("items", items);
        model.addAttribute("images", images);
        model.addAttribute("dateTimes", dateTimes);
        model.addAttribute("categories", categories);
        return "/items/list";
    }

    @PostMapping("/delete/{id}")
    public String deleteItem(HttpServletRequest request, @PathVariable Long id) {
        Item item = itemService.findById(id).orElseThrow(ItemNotFoundException::new);
        if(request.getUserPrincipal().getName().equals(item.getUser().getId()))
            this.itemService.delete(id);
        return "redirect:/items";

    }


    @GetMapping("/edit/{id}")
    public String editItemPage(@PathVariable Long id,
                               HttpServletRequest request,
                               Model model) {
        Item item = itemService.findById(id).orElseThrow(ItemNotFoundException::new);
        if(request.getUserPrincipal().getName().equals(item.getUser().getId())) {
            Category[] categories = Category.values();
            String username = request.getUserPrincipal().getName();
            model.addAttribute("username", username);
            model.addAttribute("image", Base64.getEncoder().encodeToString(item.getImage()));
            model.addAttribute("categories", categories);
            model.addAttribute("item", item);
            return "items/add";
        }
        else
            return "redirect:/items";
    }

    @GetMapping("/add")
    public String addItemPage(HttpServletRequest request,
                              Model model) {
        Category[] categories = Category.values();
        String username = request.getUserPrincipal().getName();
        model.addAttribute("username", username);
        model.addAttribute("categories", categories);
        return "items/add";
    }

    @PostMapping("/add")
    public String saveItem(HttpServletRequest request,
                           @RequestParam String name,
                           @RequestParam String description,
                           @RequestParam String isLost,
                           @RequestParam String category,
                           @RequestParam MultipartFile file,
                           @RequestParam String location) {
        this.itemService.create(request, name, description, isLost, Category.valueOf(category), file, location);
        return "redirect:/items";
    }

    @PostMapping("/edit/{id}")
    public String editItem(HttpServletRequest request,
                           @PathVariable("id") Long id,
                           @RequestParam String name,
                           @RequestParam String description,
                           @RequestParam String isLost,
                           @RequestParam Category category,
                           @RequestParam String status,
                           @RequestParam MultipartFile file,
                           @RequestParam String location) {
        Item item = itemService.findById(id).orElseThrow(ItemNotFoundException::new);
        if(request.getUserPrincipal().getName().equals(item.getUser().getId()))
            itemService.update(id, name, description, isLost, status, category, file, location);
        return "redirect:/items";
    }
}


