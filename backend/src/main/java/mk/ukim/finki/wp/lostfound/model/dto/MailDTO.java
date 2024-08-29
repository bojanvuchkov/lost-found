package mk.ukim.finki.wp.lostfound.model.dto;

import lombok.Data;
import mk.ukim.finki.wp.lostfound.model.User;

@Data
public class MailDTO {
    private String username;
    private User receiver;

    public MailDTO(String username, User receiver) {
        this.username = username;
        this.receiver = receiver;
    }
}
