package com.octaviookumu.tasks.controllers;

import com.octaviookumu.tasks.domain.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice // means this class handles exceptions across all controllers
// will capture exceptions from controllers and convert them to appropriate http responses
public class GlobalExceptionHandler {


    @ExceptionHandler({IllegalArgumentException.class})
    // specifies to handle the IllegalArgumentException we're throwing in the application
    // because the IllegalArgumentException is the one thrown in our application
    public ResponseEntity<ErrorResponse> handleException(
            RuntimeException ex, WebRequest request
    ) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage(), // we need to be careful about exposing internal details through the exception message
                request.getDescription(false)
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // the IllegalArgumentException propagates up to Spring's exception handling mechanism
    // Spring finds our ControllerAdvice class
    // Then matches the exception type against our handler method - IllegalArgumentException
    // A handler method will then create the error response with http status 400, exception message and request details
    // Spring will convert the error response to json and send that to the client
}
