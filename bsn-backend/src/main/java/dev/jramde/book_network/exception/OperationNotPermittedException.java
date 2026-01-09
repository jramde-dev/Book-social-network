package dev.jramde.book_network.exception;

/**
 * Exception to handle all action not permitted.
 */
public class OperationNotPermittedException extends RuntimeException {
    public OperationNotPermittedException(String message) {
        super(message);
    }
}
