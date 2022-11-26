package TP.RasBet.model;
import java.sql.Timestamp;
import java.io.Serializable;


import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;



@Entity
@Table(name = "game")
public class Game implements Serializable{

    @Id
    @GeneratedValue
    @Column (name = "id")
    private int id;

    @Column (name = "sport")
    private String sport;

    @Column (name = "date")
    private Timestamp date;

    @Column (name = "score")
    private String score;

    @Column (name = "state")
    private String state;

    @Column(name = "participants")
    private String participants;


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

    public Game(String sport, String participants, Timestamp date, Expert expert){
        this.sport = sport;
        this.participants = participants;
        this.date = date;
        this.state = "Before";
        this.expert = expert;
    }




    /* Getters */
    public int getId() {
        return id;
    }
    public String getSport(){
        return this.sport;
    }
    public Timestamp getDate(){
        return this.date;
    }
    public String getScore(){
        return this.score;
    }
    public String getState(){
        return this.state;
    }
    public String getParticipants() {
        return this.participants;
    }
    

    /* Setters */
    public void setSport(String sport){
        this.sport = sport;
    }
    public void setDate(Timestamp date){
        this.date = date;
    }
    public void setState(String state){
        this.state = state;
    }
    public void setExpert(Expert expert) {
        this.expert = expert;
    }
    public void setParticipants(String participants) {
        this.participants = participants;
    }


    public List<Odd> getOdds() {
        List<Odd> r = new ArrayList<>();
        for (Odd d : this.odds)
            r.add(d.clone());
        return r;
    }


    @Override
    public String toString() {
        return "" + this.id + " | " + this.sport;
    }

    public boolean equals(Object o){
        if(this == o) return true;
        if ((o == null) || (o.getClass() != this.getClass())) return false;

        Game g = (Game) o;

        return this.sport.equals(g.getSport()) && g.getParticipants().equals(this.participants) 
                                               && g.getDate().equals(this.date);
    }

}