package dev.jramde.book_network.handler;

import dev.jramde.book_network.exception.OperationNotPermittedException;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashSet;
import java.util.Set;

/**
 * Global class to handle exception in all the project.
 * RestControllerAdvice annotation make this class a global exception handler
 */

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handle all exceptions about locked accounts.
     *
     * @param exception : the exception to handle
     * @return a response entity with the exception response
     */
    @ExceptionHandler(LockedException.class)
    public ResponseEntity<BusinessExceptionResponse> handleException(LockedException exception) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(BusinessExceptionResponse.builder()
                        .businessErrorCode(EBusinessErrorCode.ACCOUNT_LOCKED.getCode())
                        .businessErrorDescription(EBusinessErrorCode.ACCOUNT_LOCKED.getDescription())
                        .businessErrorMessage(exception.getMessage())
                        .build()
                );
    }

    /**
     * Handle all exceptions about disabled accounts.
     *
     * @param exception : the exception to handle
     * @return a response entity with the exception response
     */
    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<BusinessExceptionResponse> handleException(DisabledException exception) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(BusinessExceptionResponse.builder()
                        .businessErrorCode(EBusinessErrorCode.ACCOUNT_DISABLED.getCode())
                        .businessErrorDescription(EBusinessErrorCode.ACCOUNT_DISABLED.getDescription())
                        .businessErrorMessage(exception.getMessage())
                        .build()
                );
    }

    /**
     * When the user credentials do not match.
     * @param exception : the related exception
     * @return a response entity with the exception response
     */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<BusinessExceptionResponse> handleException(BadCredentialsException exception) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(BusinessExceptionResponse.builder()
                        .businessErrorCode(EBusinessErrorCode.BAD_CREDENTIALS.getCode())
                        .businessErrorDescription(EBusinessErrorCode.BAD_CREDENTIALS.getDescription())
                        .businessErrorMessage(EBusinessErrorCode.BAD_CREDENTIALS.getDescription())
                        .build()
                );
    }

    /**
     * Handle all exceptions about when unable to send an email.
     *
     * @param exception : the exception to handle
     * @return a response entity with the exception response
     */
    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<BusinessExceptionResponse> handleException(MessagingException exception) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(BusinessExceptionResponse.builder()
                        .businessErrorMessage(exception.getMessage())
                        .build()
                );
    }

    /**
     * Throw error for not valid arguments using the @Valid annotation.
     *
     * @param exception : the exception to handle
     * @return a response entity with the exception response
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<BusinessExceptionResponse> handleException(MethodArgumentNotValidException exception) {
        Set<String> errorMessages = new HashSet<>();
        exception.getBindingResult().getAllErrors().forEach(error -> {
            String errorMessage = error.getDefaultMessage();
            errorMessages.add(errorMessage);
        });

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(BusinessExceptionResponse.builder()
                        .businessValidationErrors(errorMessages)
                        .build()
                );
    }

    /**
     * Absorb any exceptions not handled by our exception handlers.
     *
     * @param exception : the eventual exception
     * @return a response entity with the exception response
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<BusinessExceptionResponse> handleException(Exception exception) {
        // Log the exception
        exception.printStackTrace();

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(BusinessExceptionResponse.builder()
                        .businessErrorDescription("Internal server error, please contact your admin or support team.")
                        .build()
                );
    }

    /**
     * Handle our own exception.
     * @param exception : the exception
     * @return exception response
     */
    @ExceptionHandler(OperationNotPermittedException.class)
    public ResponseEntity<BusinessExceptionResponse> handleException(OperationNotPermittedException exception) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(BusinessExceptionResponse.builder()
                        .businessErrorMessage(exception.getMessage())
                        .build()
                );
    }

}
