package com.kimandnigel.allyn;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class Email {

	public void sendEmail(String fromEmail, String toEmail, String subject, String msgBody)
			throws AddressException, MessagingException {
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);

		Message msg = new MimeMessage(session);
		msg.setFrom(new InternetAddress(fromEmail));
		msg.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));
		msg.addRecipient(Message.RecipientType.TO, new InternetAddress("nigelfer@gmail.com"));
		msg.addRecipient(Message.RecipientType.TO, new InternetAddress("allen_1811@yahoo.com"));
		msg.setSubject(subject);
		msg.setText(msgBody);

		Transport.send(msg);
	}
}
