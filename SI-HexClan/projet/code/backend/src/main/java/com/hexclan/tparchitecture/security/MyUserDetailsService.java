package com.hexclan.tparchitecture.security;

import com.hexclan.tparchitecture.entity.User;
import com.hexclan.tparchitecture.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class MyUserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    public MyUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userEntity = userService.findByUsername(username);
        return MyUserDetails.getUserDetailsByUserEntity(userEntity);
    }
}
