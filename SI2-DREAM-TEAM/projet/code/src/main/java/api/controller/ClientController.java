package api.controller;

import classes.Client;
import classes.Company;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
public class ClientController {
    Company company = Company.getInstance();

    @PostMapping("/login")
    public ResponseEntity<Client> logIn(@RequestBody Map<String, String> json) {
        Client c1 = company.findClientByName(json.get("name"));
        if (c1 != null)
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(c1);
        else
            return ResponseEntity.status(HttpStatus.CREATED).body(company.signIn(json.get("name")));
    }
}
