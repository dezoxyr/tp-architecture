package com.hexclan.tparchitecture.security.jwt;

public class Token {
    private String token;

    public Token(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
