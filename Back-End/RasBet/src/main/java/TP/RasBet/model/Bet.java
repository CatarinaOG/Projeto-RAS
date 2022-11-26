package TP.RasBet.model;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import javax.persistence.*;



@Entity
@Table(name = "bet")
public class Bet implements Serializable{

    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "amount")
    private float amount;

    @Column(name = "winnings")
    private float winnings;

    @Column(name = "date")
    private Timestamp date;

    @Column(name = "result")
    private boolean result;

    @Column(name = "state")
    private String state;
    

    //many to one com user -> User_id é o nome da FK e referenced... id é a PK da tabela do user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;


    // many to many com game
    @OneToMany(mappedBy = "bet", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<GamesInOneBet> games;





    public Bet(){
        
    }

    public Bet(float amount, float winnings, Timestamp date, User user, String state){
        this.amount = amount;
        this.winnings = winnings;
        this.date = date;
        this.user = user;
        this.state = state;
    }


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

    public Timestamp getDate(){
        return this.date;
    }

    public boolean getResult(){
        return this.result;
    }

    public String getState() {
        return this.state;
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

    public void setDate(Timestamp date){
        this.date = date;
    }

    public void setResult(boolean result){
        this.result = result;
    }

    public void setState(String state) {
        this.state = state;
    }



}