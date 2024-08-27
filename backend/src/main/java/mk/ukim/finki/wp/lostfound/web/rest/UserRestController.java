package mk.ukim.finki.wp.lostfound.web.rest;

import jakarta.servlet.http.HttpServletRequest;
import mk.ukim.finki.wp.lostfound.model.Email;
import mk.ukim.finki.wp.lostfound.model.Item;
import mk.ukim.finki.wp.lostfound.model.User;
import mk.ukim.finki.wp.lostfound.model.dto.UserDetailsDTO;
import mk.ukim.finki.wp.lostfound.model.exceptions.ItemNotFoundException;
import mk.ukim.finki.wp.lostfound.model.exceptions.UserNotFoundException;
import mk.ukim.finki.wp.lostfound.repository.EmailRepository;
import mk.ukim.finki.wp.lostfound.service.ItemService;
import mk.ukim.finki.wp.lostfound.service.UserService;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserRestController {
    private final UserService userService;
    private final ItemService itemService;
    private final EmailRepository emailRepository;

    public UserRestController(UserService userService, ItemService itemService, EmailRepository emailRepository) {
        this.userService = userService;
        this.itemService = itemService;
        this.emailRepository = emailRepository;
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserDetailsDTO> getDetails(@PathVariable String id, Model model) {
        User user = userService.findById(id).orElseThrow(UserNotFoundException::new);
//        model.addAttribute("loggedInUser", loggedInUser);
//        HashMap<Email, String> dateTimesEmails = new HashMap<>();
//
//        emailRepository.findAllByReceiver(loggedInUser).forEach(email -> {
//            dateTimesEmails.put(email, email.getDateTime().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm")));
//        });
//        model.addAttribute("dateTimesEmails",dateTimesEmails);
//        model.addAttribute("receivedEmails",emailRepository.findAllByReceiver(loggedInUser));
//        List<Item> items = itemService.listItems(PageRequest.ofSize(100)).stream().filter(item -> item.getUser().getId().equals(loggedInUser.getId())).toList();
//        model.addAttribute("items",items);
//        HashMap<Item, String> dateTimes = new HashMap<>();
//        HashMap<Item, String> images = new HashMap<>();
//        items.forEach(item -> {
//            dateTimes.put(item, item.getDateRegistered().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm")));
//            images.put(item, Base64.getEncoder().encodeToString(item.getImage()));
//        });
//        model.addAttribute("images", images);
//        model.addAttribute("dateTimes", dateTimes);
        if(user!=null) {
            List<Item> items = itemService.listItems(PageRequest.ofSize(100)).stream().filter(item -> item.getUser().getId().equals("riste.stojanov")).toList();
            HashMap<Long, String> dateTimesEmails = new HashMap<>();
            HashMap<Long, String> dateTimes = new HashMap<>();
            List<Email> receivedEmails = emailRepository.findAllByReceiver(user);
            receivedEmails.forEach(email -> {
                dateTimesEmails.put(email.getId(), email.getDateTime().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm")));
            });
            items.forEach(item -> {
                dateTimes.put(item.getId(), item.getDateRegistered().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm")));
            });
            UserDetailsDTO dto = new UserDetailsDTO(user, items, dateTimesEmails, receivedEmails, dateTimes);
            return ResponseEntity.ok(dto);
        }
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}/deleteMessage/{messageId}")
    public ResponseEntity<String> deleteMessage(HttpServletRequest request, @PathVariable String id, @PathVariable Long messageId) {
        //TODO fix once login works
//        if(request.getUserPrincipal().getName().equals(item.getUser().getId()))
//            this.itemService.delete(id);
        this.userService.deleteMessage(id, messageId);
        return new ResponseEntity<>("Item deleted successfully", HttpStatus.NO_CONTENT);
    }

//    @PostMapping ("/{id}/deleteMessage/{messageId}")
//    public String deleteMessage(HttpServletRequest request,
//                                @PathVariable String id,
//                                @PathVariable Long messageId,
//                                Model model) {
//        if(request.getUserPrincipal().getName().equals(id))
//            this.userService.deleteMessage(id, messageId);
//        return "redirect:/users/{id}";
//    }

    @GetMapping("/contact/{id}")
    public String sendMailFrom(HttpServletRequest request,
                               @PathVariable String id,
                               Model model) {
        User receiver = userService.findById(id).orElseThrow(UserNotFoundException::new);
        String username = request.getUserPrincipal().getName();
        model.addAttribute("username", username);
        model.addAttribute("receiver", receiver);
        return "users/mail";
    }

    @PostMapping("/send")
    public String sendMail(HttpServletRequest request,
                           @RequestParam String receiver,
                           @RequestParam String subject,
                           @RequestParam String message) {
        userService.sendMail(request, receiver, subject, message);
        return "redirect:/items";
    }

}
