package TP.RasBet.model;
import java.sql.Timestamp;

public class GameForm{

    private String sport;
    private String participantA;
    private String participantB;
    private float oddA;
    private float oddB;
    private float oddTie;
    private Timestamp date;
    private String expert_email;



    public String getSport() {
        return sport;
    }
    public String getParticipantA() {
        return participantA;
    }
    public String getParticipantB() {
        return participantB;
    }
    public float getOddA() {
        return oddA;
    }
    public float getOddB() {
        return oddB;
    }
    public float getOddTie() {
        return oddTie;
    }
    public Timestamp getDate() {
        return date;
    }
    public String getExpert_email() {
        return expert_email;
    }
    

    public void setSport(String sport) {
        this.sport = sport;
    }
    public void setParticipantA(String participantA) {
        this.participantA = participantA;
    }
    public void setParticipantB(String participantB) {
        this.participantB = participantB;
    }
    public void setOddA(float oddA) {
        this.oddA = oddA;
    }
    public void setOddB(float oddB) {
        this.oddB = oddB;
    }
    public void setOddTie(float oddTie) {
        this.oddTie = oddTie;
    }

}