package com.maria.mkconsult;

import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

	private static final Pattern EMAIL_PATTERN = Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

	private final ObjectProvider<JavaMailSender> mailSender;
	private final String recipient;
	private final String sender;

	public ContactController(
			ObjectProvider<JavaMailSender> mailSender,
			@Value("${app.contact.recipient:finance@emkaconsult.bg}") String recipient,
			@Value("${app.contact.sender:no-reply@emkaconsult.bg}") String sender) {
		this.mailSender = mailSender;
		this.recipient = recipient;
		this.sender = sender;
	}

	@PostMapping
	public ResponseEntity<Map<String, String>> submit(@RequestBody ContactRequest request) {
		Optional<String> validationError = validate(request);
		if (validationError.isPresent()) {
			return ResponseEntity.badRequest().body(Map.of("message", validationError.get()));
		}

		JavaMailSender configuredMailSender = mailSender.getIfAvailable();
		if (configuredMailSender == null) {
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
					.body(Map.of("message", "Email delivery is not configured."));
		}

		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(sender);
		message.setTo(recipient);
		message.setReplyTo(request.email().trim());
		message.setSubject("New MK Consult contact request");
		message.setText("""
				Name: %s
				Email: %s
				Phone: %s

				Message:
				%s
				""".formatted(
				request.name().trim(),
				request.email().trim(),
				emptyToDash(request.phone()),
				request.message().trim()));

		try {
			configuredMailSender.send(message);
		} catch (MailException exception) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
					.body(Map.of("message", "Email could not be sent."));
		}

		return ResponseEntity.ok(Map.of("message", "Message sent."));
	}

	private Optional<String> validate(ContactRequest request) {
		if (request == null) {
			return Optional.of("Request body is required.");
		}
		if (!StringUtils.hasText(request.name())) {
			return Optional.of("Name is required.");
		}
		if (!StringUtils.hasText(request.email()) || !EMAIL_PATTERN.matcher(request.email().trim()).matches()) {
			return Optional.of("A valid email is required.");
		}
		if (!StringUtils.hasText(request.message())) {
			return Optional.of("Message is required.");
		}
		return Optional.empty();
	}

	private String emptyToDash(String value) {
		return StringUtils.hasText(value) ? value.trim() : "-";
	}

	public record ContactRequest(String name, String email, String phone, String message) {
	}
}
