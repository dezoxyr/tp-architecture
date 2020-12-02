package com.hexclan.tparchitecture.exception.apirequestexception;

public class NotFoundException extends ApiRequestException {
    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
