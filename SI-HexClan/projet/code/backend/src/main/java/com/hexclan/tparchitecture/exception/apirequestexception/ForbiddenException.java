package com.hexclan.tparchitecture.exception.apirequestexception;

public class ForbiddenException extends ApiRequestException {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public ForbiddenException(String message, Throwable cause) {
        super(message, cause);
    }

    public ForbiddenException(String message) {
        super(message);
    }

}
