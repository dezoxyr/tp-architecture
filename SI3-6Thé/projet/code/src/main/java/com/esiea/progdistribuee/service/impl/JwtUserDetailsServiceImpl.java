package com.esiea.progdistribuee.service.impl;

import com.esiea.progdistribuee.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserDao dao;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (dao.getUserbyUsername(username) == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new User(dao.getUserbyUsername(username).getUsername(), bcryptEncoder.encode(dao.getUserbyUsername(username).getPassword()),
                new ArrayList<>());
    }
}
