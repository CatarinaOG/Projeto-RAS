package TP.RasBet.model;
import java.sql.Date;
import java.io.Serializable;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;



@Entity
@Table(name = "game")
public class Game implements Serializable{

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
    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Odd> odds;

    
    //many to one de game para expert
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "expert_id", referencedColumnName = "id")
    private Expert expert;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<GamesInOneBet> games;




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
    public void setExpert(Expert expert) {
        this.expert = expert;
    }

    @Override
    public String toString() {
        return "" + this.id + " | " + this.sport;
    }
}