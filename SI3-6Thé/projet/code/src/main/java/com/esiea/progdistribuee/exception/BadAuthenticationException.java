package com.esiea.progdistribuee.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason="Wrong credentials")
public class BadAuthenticationException extends RuntimeException {}

