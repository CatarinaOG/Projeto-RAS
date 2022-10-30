package TP.RasBet.model;
import java.sql.Date;

import javax.persistence.*;



@Entity
@Table(name = "Transaction")
public class Transaction{

    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "Description")
    private String description;

    @Column(name = "Amount")
    private float amount;

    @Column(name = "Date")
    private Date date;

    @Column(name = "FinalBalance")
    private float finalBalance;

    /* Getters */
    public String getDescription(){
        return this.description;
    }
    public float getAmount(){
        return this.amount;
    }
    public Date getDate(){
        return this.date;
    }
    public float getFinalBalance(){
        return this.finalBalance;
    }

    /* Setters */
    public void setDescription(String description){
        this.description = description;
    }
    public void setAmount(float ammount){
        this.amount = ammount;
    }
    public void setDate(Date date){
        this.date = date;
    }
    public void setFinalBalance(float finalBalance){
        
        this.finalBalance = finalBalance;
    }
}