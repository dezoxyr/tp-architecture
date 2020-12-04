package com.esiea.progdistribuee.controller;

import com.esiea.progdistribuee.data.User;
import com.esiea.progdistribuee.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/")
    public List<User> allUsers() {
        return service.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable int id) {
        return service.getUser(id);
    }

    @GetMapping("/information")
    public JsonNode getUserInfo(Authentication authentication) {
        String username = authentication.getName();
        User user = service.getUserByUsername(username);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.createObjectNode();
        ((ObjectNode) node).put("id", user.getId());
        ((ObjectNode) node).put("username", user.getUsername());
        return node;
    }

    @PostMapping("/new")
    public void create(@RequestParam String username, @RequestParam String password) throws Exception {
        if(service.getUserByUsername(username) != null)
            throw new Exception("User already exists");

        service.createUser(username, password);
    }

    @PutMapping("/edit")
    public void edit(@RequestParam int id, @RequestParam(required = false) String username, @RequestParam(required = false) String password) {
        service.editUser(id, username, password);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam int id) {
        service.deleteUser(service.getUser(id));
    }

}