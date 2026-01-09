package dev.jramde.book_network.email;

import dev.jramde.book_network.enums.EEmailTemplateName;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService {

    // From java mail sender
    private final JavaMailSender mailSender;

    // From thymeleaf
    private final SpringTemplateEngine templateEngine;

    /**
     * Must send email.
     *
     * @param to              : who will receive the email
     * @param subject         : email subject
     * @param username        : the username
     * @param emailTemplate   : email template
     * @param confirmationUrl : How the user will be redirected to confirm the email
     * @param activationCode  : activation code
     */
    @Async // Send email asynchronously to not block the thread or make wait the user (must be enabled in application)
    public void sendEmail(
            String to,
            String username,
            EEmailTemplateName emailTemplate,
            String confirmationUrl,
            String activationCode,
            String subject) throws MessagingException {

        // Template file name to render
        String templateName;
        if (emailTemplate == null) {
            templateName = "confirm-email";
        } else {
            templateName = emailTemplate.getName();
        }

        // Hardly pass parameters to our email
        Map<String, Object> emailProperties = new HashMap<>();
        emailProperties.put("username", username);
        emailProperties.put("confirmationUrl", confirmationUrl);
        emailProperties.put("activation_code", activationCode);

        // Context from thymeleaf
        Context context = new Context();
        context.setVariables(emailProperties);

        // Render template
        String templateContent = templateEngine.process(templateName, context);

        // Create mime message
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(
                mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED, StandardCharsets.UTF_8.name());

        mimeMessageHelper.setFrom("user@dev.com");
        mimeMessageHelper.setSubject(subject);
        mimeMessageHelper.setTo(to);
        mimeMessageHelper.setText(templateContent, true);
        mailSender.send(mimeMessage);
    }

}
