package com.hexclan.tparchitecture.exception.apirequestexception;

public class NotFoundException extends ApiRequestException {
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
