package mk.ukim.finki.wp.lostfound.model.dto;

import lombok.Data;
import mk.ukim.finki.wp.lostfound.model.Email;
import mk.ukim.finki.wp.lostfound.model.Item;
import mk.ukim.finki.wp.lostfound.model.User;

import java.util.HashMap;
import java.util.List;

@Data
public class UserDetailsDTO {
    private User loggedInUser;
    private List<Item> items;
    private HashMap<Long, String> dateTimesEmails;
    private List<Email> receivedEmails;
    private HashMap<Long, String> dateTimes;

    // Constructor
    public UserDetailsDTO(User loggedInUser, List<Item> items, HashMap<Long, String> dateTimesEmails, List<Email> receivedEmails, HashMap<Long, String> dateTimes) {
        this.loggedInUser = loggedInUser;
        this.items = items;
        this.dateTimesEmails = dateTimesEmails;
        this.receivedEmails = receivedEmails;
        this.dateTimes = dateTimes;
    }
}
