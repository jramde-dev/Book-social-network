package dev.jramde.book_network.handler;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY) // Do not include fields that can be null or empty
public class BusinessExceptionResponse {
    private Integer businessErrorCode;
    private String businessErrorDescription;
    private String businessErrorMessage;

    /**
     * Will store all field message errors.
     */
    private Set<String> businessValidationErrors;
    private Map<String, String> businessErrorsMessages;
}
