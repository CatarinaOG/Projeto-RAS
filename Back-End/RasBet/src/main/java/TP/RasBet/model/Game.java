package TP.RasBet.model;
import java.sql.Date;

import javax.persistence.*;



@Entity
@Table(name = "Game")
public class Game{

    @Id
    @GeneratedValue
    @Column (name = "id")
    private int id;

    @Column (name = "Sport")
    private String sport;

    @Column (name = "Date")
    private Date date;

    @Column (name = "Score")
    private String score;

    @Column (name = "State")
    private String state;

    //@ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name = "restaurante_nome", referencedColumnName = "nome")
    //private Odd odds;

    //falta many to many com bet

    /* Getters */
    public String getSport(){
        return this.sport;
    }
    public Date getDate(){
        return this.date;
    }
    public String getScore(){
        return this.score;
    }
    public String getState(){
        return this.state;
    }

    /* Setters */
    public void setSport(String sport){
        this.sport = sport;
    }
    public void setDate(Date date){
        this.date = date;
    }
    public void setState(String state){
        this.state = state;
    }
}