# Email Notification Implementation Guide

This guide explains how to implement email notifications for quote requests and offers in your Spring Boot backend.

---

## Overview

The email system will:
1. Send a confirmation email when a user creates a quote request with a link to view offers
2. Send a notification email when a clinic submits a new offer
3. Use HTML formatted emails with TunisiaMed branding

---

## Step 1: Add Email Dependencies

Add the Spring Boot Mail starter to your `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

---

## Step 2: Configure Email Settings

Add email configuration to your `application.properties`:

```properties
# Email Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# Application URL for email links
app.frontend.url=http://localhost:4200
```

**Note for Gmail:**
- Use an App Password, not your regular Gmail password
- Enable 2-factor authentication on your Google account
- Generate an App Password at: https://myaccount.google.com/apppasswords

---

## Step 3: Create EmailService

Create a new file `src/main/java/com/example/projet/services/EmailService.java`:

```java
package com.example.projet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Value("${spring.mail.username}")
    private String fromEmail;

    /**
     * Send confirmation email when a quote request is created
     */
    public void sendQuoteRequestConfirmation(String toEmail, String firstName, String lastName, String token) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Your Quote Request - TunisiaMed");

            String viewOffersUrl = frontendUrl + "/view-offers?token=" + token;

            String htmlContent = String.format("""
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #0d9488; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                        .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
                        .button { display: inline-block; background-color: #0d9488; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>TunisiaMed</h1>
                        </div>
                        <div class="content">
                            <h2>Dear %s %s,</h2>
                            <p>Thank you for submitting your quote request!</p>
                            <p>Your request has been received and clinics will start reviewing it shortly. You will receive offers from interested clinics.</p>
                            <p>Click the button below to view your offers:</p>
                            <div style="text-align: center;">
                                <a href="%s" class="button">View Your Offers</a>
                            </div>
                            <p>Or copy this link: <a href="%s">%s</a></p>
                            <p><strong>Important:</strong> Save this link to check for new offers at any time.</p>
                        </div>
                        <div class="footer">
                            <p>© 2026 TunisiaMed. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
                """, firstName, lastName, viewOffersUrl, viewOffersUrl, viewOffersUrl);

            helper.setText(htmlContent, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    /**
     * Send notification email when a new offer is received
     */
    public void sendNewOfferNotification(String toEmail, String firstName, String lastName, String clinicName, String token) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("New Offer Received - TunisiaMed");

            String viewOffersUrl = frontendUrl + "/view-offers?token=" + token;

            String htmlContent = String.format("""
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #0d9488; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                        .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
                        .button { display: inline-block; background-color: #0d9488; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
                        .highlight { background-color: #d1fae5; padding: 15px; border-radius: 6px; margin: 15px 0; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>TunisiaMed</h1>
                        </div>
                        <div class="content">
                            <h2>Dear %s %s,</h2>
                            <div class="highlight">
                                <p><strong>Good news!</strong> You have received a new offer from <strong>%s</strong>.</p>
                            </div>
                            <p>Click the button below to view all your offers:</p>
                            <div style="text-align: center;">
                                <a href="%s" class="button">View Your Offers</a>
                            </div>
                        </div>
                        <div class="footer">
                            <p>© 2026 TunisiaMed. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
                """, firstName, lastName, clinicName, viewOffersUrl);

            helper.setText(htmlContent, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
```

---

## Step 4: Update QuoteRequestService

Modify your `QuoteRequestService.java` to send email when a quote request is created:

```java
package com.example.projet.services;

import com.example.projet.entities.QuoteRequest;
import com.example.projet.entities.enums.QuoteStatus;
import com.example.projet.repositories.QuoteRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class QuoteRequestService {

    @Autowired
    private QuoteRequestRepository quoteRequestRepository;

    @Autowired
    private EmailService emailService;

    public QuoteRequest createQuoteRequest(QuoteRequest quoteRequest) {
        // Generate unique token
        quoteRequest.setToken(UUID.randomUUID().toString());
        quoteRequest.setStatus(QuoteStatus.PENDING);
        quoteRequest.setCreatedAt(LocalDateTime.now());
        
        // Save quote request
        QuoteRequest saved = quoteRequestRepository.save(quoteRequest);
        
        // Send confirmation email with link to view offers
        emailService.sendQuoteRequestConfirmation(
            saved.getEmail(),
            saved.getFname(),
            saved.getLname(),
            saved.getToken()
        );
        
        return saved;
    }

    // ... other methods
}
```

---

## Step 5: Update QuoteResponseService

Modify your `QuoteResponseService.java` to send email when a new offer is created:

```java
package com.example.projet.services;

import com.example.projet.entities.QuoteRequest;
import com.example.projet.entities.QuoteResponse;
import com.example.projet.entities.enums.QuoteStatus;
import com.example.projet.repositories.QuoteRequestRepository;
import com.example.projet.repositories.QuoteResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class QuoteResponseService {

    @Autowired
    private QuoteResponseRepository quoteResponseRepository;

    @Autowired
    private QuoteRequestRepository quoteRequestRepository;

    @Autowired
    private EmailService emailService;

    public QuoteResponse createQuoteResponse(QuoteResponse quoteResponse) {
        quoteResponse.setStatus(QuoteStatus.SENT);
        quoteResponse.setCreatedAt(LocalDateTime.now());
        
        // Save quote response
        QuoteResponse saved = quoteResponseRepository.save(quoteResponse);
        
        // Get quote request to send notification
        QuoteRequest quoteRequest = quoteRequestRepository.findById(quoteResponse.getQuoteRequestId())
            .orElseThrow(() -> new RuntimeException("Quote request not found"));
        
        // Send new offer notification email
        emailService.sendNewOfferNotification(
            quoteRequest.getEmail(),
            quoteRequest.getFname(),
            quoteRequest.getLname(),
            saved.getClinicName(),
            quoteRequest.getToken()
        );
        
        return saved;
    }

    // ... other methods
}
```

---

## Step 6: Update Production Configuration

For production, update `application-prod.properties`:

```properties
# Production Email Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${EMAIL_USERNAME}
spring.mail.password=${EMAIL_PASSWORD}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# Production Frontend URL
app.frontend.url=https://your-production-domain.com
```

Use environment variables for sensitive data in production.

---

## Testing

1. **Test Quote Request Creation:**
   - Submit a quote request from your Angular frontend
   - Check the email inbox for the confirmation email
   - Click the link to verify it opens the view-offers page

2. **Test New Offer Notification:**
   - Create a quote response from clinic admin panel
   - Check the email inbox for the new offer notification
   - Click the link to verify it shows the new offer

---

## Troubleshooting

### Email not sending:
- Verify Gmail credentials are correct
- Ensure 2FA is enabled and App Password is used
- Check firewall/network allows SMTP connections on port 587
- Review application logs for error messages

### Links not working:
- Verify `app.frontend.url` is set correctly
- Ensure Angular dev server is running on the configured port
- Check that the token is being generated and saved correctly

### HTML not rendering:
- Ensure `helper.setText(htmlContent, true)` has `true` parameter
- Test email in different email clients (Gmail, Outlook, etc.)

---

## Alternative Email Providers

If not using Gmail, update the SMTP settings:

**Outlook/Hotmail:**
```properties
spring.mail.host=smtp-mail.outlook.com
spring.mail.port=587
```

**SendGrid:**
```properties
spring.mail.host=smtp.sendgrid.net
spring.mail.port=587
spring.mail.username=apikey
spring.mail.password=your-sendgrid-api-key
```

**AWS SES:**
```properties
spring.mail.host=email-smtp.us-east-1.amazonaws.com
spring.mail.port=587
spring.mail.username=your-ses-smtp-username
spring.mail.password=your-ses-smtp-password
```

---

## Summary

After implementing these changes:
1. ✅ Users receive a confirmation email with a link when they create a quote request
2. ✅ Users receive a notification email when they get a new offer
3. ✅ Emails are HTML formatted with TunisiaMed branding
4. ✅ All links direct users to the view-offers page with their unique token
