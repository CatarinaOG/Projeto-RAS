package TP.RasBet.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;


@Service
public class EmailSenderService implements IEmailSenderService{

    @Autowired
    private JavaMailSender mailSender;
    
    private void sendSimpleEmail(String toEmail, String body, String subject){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("jpdelgado2001@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);
        mailSender.send(message);
    }

    public void betWonNotification(String email, float winnings){
        String body = "Your bet has been closed. You won " + winnings +"€!";
        String subject = "Bet Closed!";
        this.sendSimpleEmail(email, body, subject);
    }

    public void betLostNotification(String email){
        String body = "Your bet has been closed. You Lost !";
        String subject = "Bet Closed!";
        this.sendSimpleEmail(email, body, subject);
    }

    public void sensitiveInfoCode(String email, UUID code){
        String body = "Insert this code to change your sensitive information: " + code;
        String subject = "Change Personal Information Code";
        this.sendSimpleEmail(email, body, subject);
    }

    public void passwordRecovery(String email, String password){
        String body = "This is your password: " + password;
        String subject = "Password recovery";
        this.sendSimpleEmail(email, body, subject);
    }

}