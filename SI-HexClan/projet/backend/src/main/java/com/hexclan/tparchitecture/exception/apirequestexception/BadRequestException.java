package com.hexclan.tparchitecture.exception.apirequestexception;

public class BadRequestException extends ApiRequestException {

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}
