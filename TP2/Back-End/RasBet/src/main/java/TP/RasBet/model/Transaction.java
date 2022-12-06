package TP.RasBet.model;
import java.sql.Date;
import java.sql.Timestamp;
import java.io.Serializable;

import javax.persistence.*;



@Entity
@Table(name = "transaction")
public class Transaction implements Serializable{

    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "description")
    private String description;

    @Column(name = "amount")
    private float amount;

    @Column(name = "date")
    private Timestamp date;

    @Column(name = "final_balance")
    private float finalBalance;

 
    //many to one com user -> User_id é o nome da FK e id é a coluna referenciada que é a PK da tabela do user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
 




    public Transaction(){
        
    }


    public Transaction(String description, float amount, Timestamp date){
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.finalBalance = 0.0f;
    }




    /* Getters */
    public String getDescription(){
        return this.description;
    }
    public float getAmount(){
        return this.amount;
    }
    public Timestamp getDate(){
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
    public void setDate(Timestamp date){
        this.date = date;
    }
    public void setFinalBalance(float finalBalance){
        this.finalBalance = finalBalance;
    }
    public void setUser(User user) {
        this.user = user;
    }
}