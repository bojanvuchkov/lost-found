package mk.ukim.finki.wp.lostfound.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LoginResponse {
    private final String token;
    private final String id;
}
