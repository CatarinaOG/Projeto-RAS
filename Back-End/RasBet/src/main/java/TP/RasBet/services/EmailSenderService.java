package TP.RasBet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;


@Service
public class EmailSenderService implements IEmailSenderService{

    @Autowired
    private JavaMailSender mailSender;
    
    public void sendSimpleEmail(String toEmail, String body, String subject){

        SimpleMailMessage message = new SimpleMailMessage();


        message.setFrom("jpdelgado2001@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);

        mailSender.send(message);

    }



}