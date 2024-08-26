package mk.ukim.finki.wp.lostfound.web.rest;

import jakarta.servlet.http.HttpServletRequest;
import mk.ukim.finki.wp.lostfound.model.Item;
import mk.ukim.finki.wp.lostfound.service.ItemService;
import mk.ukim.finki.wp.lostfound.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
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

//
//    @PostMapping("/delete/{id}")
//    public String deleteItem(HttpServletRequest request, @PathVariable Long id) {
//        Item item = itemService.findById(id).orElseThrow(ItemNotFoundException::new);
//        if(request.getUserPrincipal().getName().equals(item.getUser().getId()))
//            this.itemService.delete(id);
//        return "redirect:/items";
//
//    }
//
//
//    @GetMapping("/edit/{id}")
//    public String editItemPage(@PathVariable Long id,
//                               HttpServletRequest request,
//                               Model model) {
//        Item item = itemService.findById(id).orElseThrow(ItemNotFoundException::new);
//        if(request.getUserPrincipal().getName().equals(item.getUser().getId())) {
//            Category[] categories = Category.values();
//            String username = request.getUserPrincipal().getName();
//            model.addAttribute("username", username);
//            model.addAttribute("image", Base64.getEncoder().encodeToString(item.getImage()));
//            model.addAttribute("categories", categories);
//            model.addAttribute("item", item);
//            return "items/add";
//        }
//        else
//            return "redirect:/items";
//    }
//
//    @GetMapping("/add")
//    public String addItemPage(HttpServletRequest request,
//                              Model model) {
//        Category[] categories = Category.values();
//        String username = request.getUserPrincipal().getName();
//        model.addAttribute("username", username);
//        model.addAttribute("categories", categories);
//        return "items/add";
//    }
//
//    @PostMapping("/add")
//    public String saveItem(HttpServletRequest request,
//                           @RequestParam String name,
//                           @RequestParam String description,
//                           @RequestParam String isLost,
//                           @RequestParam String category,
//                           @RequestParam MultipartFile file,
//                           @RequestParam String location) {
//        this.itemService.create(request, name, description, isLost, Category.valueOf(category), file, location);
//        return "redirect:/items";
//    }
//
//    @PostMapping("/edit/{id}")
//    public String editItem(HttpServletRequest request,
//                           @PathVariable("id") Long id,
//                           @RequestParam String name,
//                           @RequestParam String description,
//                           @RequestParam String isLost,
//                           @RequestParam Category category,
//                           @RequestParam String status,
//                           @RequestParam MultipartFile file,
//                           @RequestParam String location) {
//        Item item = itemService.findById(id).orElseThrow(ItemNotFoundException::new);
//        if(request.getUserPrincipal().getName().equals(item.getUser().getId()))
//            itemService.update(id, name, description, isLost, status, category, file, location);
//        return "redirect:/items";
//    }
}


