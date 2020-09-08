package org.crown.service;

import io.github.jhipster.config.JHipsterProperties;
import org.crown.domain.Claim;
import org.crown.domain.Support;
import org.crown.domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

/**
 * Service for sending emails.
 * <p>
 * We use the {@link Async} annotation to send emails asynchronously.
 */
@Service
public class MailService {

    private final Logger log = LoggerFactory.getLogger(MailService.class);

    private static final String BASE_URL_PROPERTY_KEY = "baseUrl";
    private static final String USER = "user";
    private static final String BASE_URL = "baseUrl";
    private static final String CLAIM = "claim";
    private static final String SUPPORT = "support";

    private final JHipsterProperties jHipsterProperties;
    private final JavaMailSender javaMailSender;
    private final MessageSource messageSource;
    private final SpringTemplateEngine templateEngine;
    private final Environment environment;

    public MailService(
        JHipsterProperties jHipsterProperties,
        JavaMailSender javaMailSender,
        MessageSource messageSource,
        SpringTemplateEngine templateEngine,
        Environment environment
    ) {
        this.jHipsterProperties = jHipsterProperties;
        this.javaMailSender = javaMailSender;
        this.messageSource = messageSource;
        this.templateEngine = templateEngine;
        this.environment = environment;
    }

    @Async
    public void sendEmail(String to, String subject, String content, boolean isMultipart, boolean isHtml) {
        String emailFrom = jHipsterProperties.getMail().getFrom();
        log.debug("Send email[multipart '{}' and html '{}'] from '{}' to '{}' with subject '{}' and content={}",
            isMultipart, isHtml, emailFrom, to, subject, content);

        // Prepare message using a Spring helper
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
            message.setTo(to);
            message.setFrom(emailFrom);
            message.setSubject(subject);
            message.setText(content, isHtml);
            javaMailSender.send(mimeMessage);
            log.debug("Sent email to User '{}'", to);
        } catch (MailException | MessagingException e) {
            log.warn("Email could not be sent to user '{}'", to, e);
        }
    }

    @Async
    public void sendEmailFromTemplate(User user, String templateName, String titleKey) {
        if (user.getEmail() == null) {
            log.debug("Email doesn't exist for user '{}'", user.getLogin());
            return;
        }
        Locale locale = Locale.forLanguageTag(user.getLangKey());
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(BASE_URL, environment.getProperty(BASE_URL_PROPERTY_KEY));
        String content = templateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, locale);
        sendEmail(user.getEmail(), subject, content, false, true);
    }

    @Async
    public void sendSupportEmailFromTemplate(Support support, String templateName, String titleKey) {
        Locale locale = Locale.forLanguageTag("US");
        Context context = new Context(locale);
        context.setVariable(SUPPORT, support);
        context.setVariable(BASE_URL, environment.getProperty(BASE_URL_PROPERTY_KEY));
        String content = templateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, locale);
        sendEmail(jHipsterProperties.getMail().getFrom(), subject, content, false, true);
    }

    @Async
    public void sendClaimEmailFromTemplate(User user, Claim claim, String templateName,
                                           String otherTemplateName, String titleKey) {
        if (user.getEmail() == null) {
            log.debug("Email doesn't exist for user '{}'", user.getLogin());
            return;
        }
        Locale locale = Locale.forLanguageTag(user.getLangKey());
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(CLAIM, claim);
        context.setVariable(BASE_URL, environment.getProperty(BASE_URL_PROPERTY_KEY));
        String content = templateEngine.process(templateName, context);
        String otherContent = templateEngine.process(otherTemplateName, context);
        String subject = messageSource.getMessage(titleKey, null, locale);
        sendEmail(user.getEmail(), subject, content, false, true);
        sendEmail(jHipsterProperties.getMail().getFrom(), subject, otherContent, false, true);
    }

    @Async
    public void sendActivationEmail(User user) {
        log.debug("Sending activation email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/activationEmail", "email.activation.title");
    }

    @Async
    public void sendCreationEmail(User user) {
        log.debug("Sending creation email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/creationEmail", "email.activation.title");
    }

    @Async
    public void sendPasswordResetMail(User user) {
        log.debug("Sending password reset email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/passwordResetEmail", "email.reset.title");
    }

    @Async
    public void sendSupportEmail(Support support) {
        log.debug("Sending email support from '{}'", support.getEmail());
        sendSupportEmailFromTemplate(support, "mail/supportEmail", "email.support.title");
    }

    @Async
    public void sendClaimEmail(User user, Claim claim) {
        log.debug("Sending email to Crown Admin and '{}'", user.getEmail());
        sendClaimEmailFromTemplate(user, claim, "mail/claimUserEmail",
            "mail/claimAdminEmail", "email.claim.title");
    }
}
