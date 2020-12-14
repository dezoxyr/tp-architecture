package com.hexclan.tparchitecture.service;

import com.hexclan.tparchitecture.entity.User;
import com.hexclan.tparchitecture.exception.apirequestexception.BadRequestException;
import com.hexclan.tparchitecture.exception.apirequestexception.ForbiddenException;
import com.hexclan.tparchitecture.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(String username, String email, String password) throws BadRequestException {
        // test if username already taken
        Optional<User> uExists = repository.findByUsername(username);
        if (uExists.isPresent())
            throw new BadRequestException("Username is already taken");

        // test if email already taken
        uExists = repository.findByEmail(email);
        if (uExists.isPresent())
            throw new BadRequestException("Email is already taken");

        User u = new User(username, email, passwordEncoder.encode(password));
        return repository.save(u);
    }

    public Optional<User> findById(Integer id) {
        return repository.findById(id);
    }

    public User findByUsername(String username) throws BadRequestException {
        Optional<User> u = repository.findByUsername(username);

        if (u.isEmpty()) {
            throw new BadRequestException("User=" + username + " not found");
        }
        return repository.getOne(u.get().getId());
    }

    public User findByEmail(String email) throws BadRequestException {
        Optional<User> u = repository.findByEmail(email);

        if (u.isEmpty()) {
            throw new BadRequestException("User=" + email + " not found");
        }
        return repository.getOne(u.get().getId());
    }

    public User findByLoginAndPassword(String username, String password) throws ForbiddenException {
        User user = findByUsername(username);
        if (user != null) {
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        throw new ForbiddenException("Username or password incorrect");
    }

    public void save(User user) {
        repository.saveAndFlush(user);
    }

    public void delete(User user) {
        repository.delete(user);
    }
}
