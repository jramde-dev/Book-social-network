package dev.jramde.book_network.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

/**
 * @author : Juldas RAMDE, ramde266@gmail.com.
 * @since : 15/12/2025, 01:55
 */

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Juldas RAMDE",
                        email = "ramde266@gmail.com",
                        url = "https://www.linkedin.com/in/juldas-ramde-software-engineer/"),
                description = "Open API documentation for Spring Boot",
                title = "Open API specification - Juldas",
                version = "1.0",
                license = @License(
                        name = "Licence name",
                        url = "http://letmelikethat"),
                termsOfService = "Terms of service"
        ),
        servers = {
                @Server(description = "Local ENV", url = "http://localhost:8080/api/v1"),
                @Server(description = "Prod ENV", url = "https://jramde.dev")
        },
        security = {
                @SecurityRequirement(name = "bearerAuth")
        }
)
@SecurityScheme(
        name = "bearerAuth",
        description = "JWT auth description",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {

}
