package TP.RasBet.model;
import java.sql.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;



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


    //one to many de game para odd
    @JsonIgnore
    @OneToMany(mappedBy = "Game", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Odd> odds;

    
    //many to one de game para expert
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Expert_id", referencedColumnName = "id")
    private Expert expert;


    //many to many com bet
    @ManyToMany
    @JoinTable(
            name = "GamesInOneBet",
            joinColumns = @JoinColumn(name = "Bet_id"),
            inverseJoinColumns = @JoinColumn(name = "Game_id"))
    private List<Bet> bets;




    public Game(){
        
    }






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