package com.kimandnigel.allyn;

import java.io.IOException;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SendMsgServlet extends HttpServlet {

	private static final long serialVersionUID = 700000007656710924L;
	private static final String FROM_EMAIL = "nigelfer@gmail.com"; // site ADMIN
	private static final String TO_EMAIL = "al.lyn.061214@gmail.com";
	private static final String SUBJECT = "From AlLyn site.";

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		System.out.println("in SendMsgServlet");

		String fromName = req.getParameter("fromName");
		String msg = req.getParameter("msg");
		String fromEmail = req.getParameter("fromEmail");
		msg = "Hi! You have a new message from - " + fromName + "( " + fromEmail + " )\n\n" +
				"Message: '" + msg + "' \n\n";

		System.out.println(" msg=" + msg);

		Email email = new Email();
		try {
			email.sendEmail(FROM_EMAIL, TO_EMAIL, SUBJECT, msg);
		} catch (MessagingException e) {
			System.out.println("ERROR " + e);
			throw new IOException("Error sending email!");
		}

	}
}
