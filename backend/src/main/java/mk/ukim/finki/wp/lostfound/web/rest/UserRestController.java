package mk.ukim.finki.wp.lostfound.web.rest;

import jakarta.servlet.http.HttpServletRequest;
import mk.ukim.finki.wp.lostfound.model.Email;
import mk.ukim.finki.wp.lostfound.model.Item;
import mk.ukim.finki.wp.lostfound.model.User;
import mk.ukim.finki.wp.lostfound.model.dto.MailDTO;
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
    public ResponseEntity<UserDetailsDTO> getDetails(@PathVariable String id) {
        User user = userService.findById(id).orElseThrow(UserNotFoundException::new);
        if(user!=null) {
            List<Item> items = itemService.findItemsByUser(user);
            List<Email> receivedEmails = emailRepository.findAllByReceiver(user);

            UserDetailsDTO dto = new UserDetailsDTO(user, items, receivedEmails);
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

    @GetMapping("/contact/{id}")
    public ResponseEntity<MailDTO> sendMailFrom(HttpServletRequest request,
                                                @PathVariable String id) {
        User receiver = userService.findById(id).orElseThrow(UserNotFoundException::new);
        String username = request.getUserPrincipal().getName();

        MailDTO dto = new MailDTO(username, receiver);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendMail(HttpServletRequest request,
                                           @RequestParam String receiver,
                                           @RequestParam String subject,
                                           @RequestParam String message) {
        try {
            userService.sendMail(request, receiver, subject, message);
            return ResponseEntity.ok("Mail sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send mail");
        }
    }

}
