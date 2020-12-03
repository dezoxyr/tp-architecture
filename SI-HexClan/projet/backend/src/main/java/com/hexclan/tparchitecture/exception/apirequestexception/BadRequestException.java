package com.hexclan.tparchitecture.exception.apirequestexception;

public class BadRequestException extends ApiRequestException {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}
