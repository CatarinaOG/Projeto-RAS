package TP.RasBet.services;

public interface IEmailSenderService  {
    public void sendSimpleEmail(String toEmail, String body, String subject);
}
