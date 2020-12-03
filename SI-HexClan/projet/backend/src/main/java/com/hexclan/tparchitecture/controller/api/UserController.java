package com.hexclan.tparchitecture.controller.api;

import com.hexclan.tparchitecture.entity.User;
import com.hexclan.tparchitecture.exception.apirequestexception.BadRequestException;
import com.hexclan.tparchitecture.exception.apirequestexception.ForbiddenException;
import com.hexclan.tparchitecture.security.jwt.JwtProvider;
import com.hexclan.tparchitecture.security.jwt.Token;
import com.hexclan.tparchitecture.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtProvider jwtProvider;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody Map<String, Object> request)
            throws BadRequestException {
        if (!request.containsKey("username") || !request.containsKey("password")) {
            throw new BadRequestException("Username and password must be provided");
        }

        String username = (String) request.get("username");
        String password = (String) request.get("password");

        return new ResponseEntity<>(userService.register(username, password), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable(name = "id") String id) throws BadRequestException {
        try {
            Integer idInt = Integer.parseInt(id);
            Optional<User> u = userService.findById(idInt);
            if (u.isEmpty())
                throw new BadRequestException("User=" + id + " not found");

            return ResponseEntity.ok(u.get());

        } catch (NumberFormatException e) {
            throw new BadRequestException("Invalid id");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(HttpServletRequest httpRequest) {
        String username = (String) httpRequest.getAttribute("username");
        User user = userService.findByUsername(username);

        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, Object> request)
            throws BadRequestException, ForbiddenException {
        String username = (String) request.get("username");
        String password = (String) request.get("password");

        User user = userService.findByLoginAndPassword(username, password);
        String token = jwtProvider.generateToken(user.getUsername());

        return ResponseEntity.ok(new Token(token));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") String id) {
        try {
            Integer idInt = Integer.parseInt(id);
            Optional<User> u = userService.findById(idInt);
            if (u.isEmpty())
                throw new BadRequestException("User=" + id + " not found");

            userService.delete(u.get());

            return ResponseEntity.noContent().build();

        } catch (NumberFormatException e) {
            throw new BadRequestException("Invalid id");
        }
    }
}
