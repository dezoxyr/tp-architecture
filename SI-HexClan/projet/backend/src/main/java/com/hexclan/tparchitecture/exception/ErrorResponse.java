package com.hexclan.tparchitecture.exception;

import com.hexclan.tparchitecture.exception.apirequestexception.BadRequestException;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

public class ErrorResponse {
    private final String message;
    private final HttpStatus status;
    private final Integer code;
    private final ZonedDateTime timestamp;

    public ErrorResponse(String message, HttpStatus status, Integer code, ZonedDateTime timestamp) {
        this.message = message;
        this.status = status;
        this.code = code;
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }

    public Integer getCode() {
        return code;
    }
}
