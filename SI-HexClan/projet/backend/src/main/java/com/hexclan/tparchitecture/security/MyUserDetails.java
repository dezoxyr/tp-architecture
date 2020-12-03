package com.hexclan.tparchitecture.security;

import com.hexclan.tparchitecture.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

public class MyUserDetails implements org.springframework.security.core.userdetails.UserDetails {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    private String username;
    private String password;
    private Collection<? extends GrantedAuthority> grantedAuthorities;

    public static MyUserDetails getUserDetailsByUserEntity(User user) {
        MyUserDetails c = new MyUserDetails();
        c.username = user.getUsername();
        c.password = user.getPassword();
        String roles = "USER"; // everyone is user, no special roles or authorities
        c.grantedAuthorities = Arrays.stream(roles.split(",")).map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        return c;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
