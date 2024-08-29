package mk.ukim.finki.wp.lostfound.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import mk.ukim.finki.wp.lostfound.model.Email;
import mk.ukim.finki.wp.lostfound.model.Item;
import mk.ukim.finki.wp.lostfound.model.User;

import java.util.List;

@Data
@AllArgsConstructor
public class UserDetailsDTO {
    private User loggedInUser;
    private List<Item> items;
    private List<Email> receivedEmails;
}
