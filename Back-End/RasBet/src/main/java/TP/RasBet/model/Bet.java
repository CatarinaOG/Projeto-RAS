package TP.RasBet.model;
import java.sql.Date;

import javax.persistence.*;



@Entity
@Table(name = "Bet")
public class Bet{

    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "Amount")
    private float amount;

    @Column(name = "Winnings")
    private float winnings;

    @Column(name = "Date")
    private Date date;

    @Column(name = "Result")
    private boolean result;
    




    /* Getters */

    public int getId(){
        return this.id;
    }

    public float getAmount(){
        return this.amount;
    }

    public float getWinnings(){
        return this.winnings;
    }

    public Date getDate(){
        return this.date;
    }

    public boolean getResult(){
        return this.result;
    }




    /* Setters */

    public void setId(int id){
        this.id = id;
    }

    public void setAmount(float amount){
        this.amount = amount;
    }

    public void setWinnings(float winnings){
        this.winnings = winnings;
    }

    public void setDate(Date date){
        this.date = date;
    }

    public void setResult(boolean result){
        this.result = result;
    }

}