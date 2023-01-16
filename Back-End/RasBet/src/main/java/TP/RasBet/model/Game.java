package TP.RasBet.model;
import java.sql.Timestamp;
import java.io.Serializable;


import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import TP.RasBet.repositories.User_follows_game_Repo;
import TP.RasBet.services.EmailSenderService;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;



@Entity
@Table(name = "game")
public class Game implements Serializable, Subject{

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

    @Column(name = "name")
    private String name;


    //one to many de game para odd
    @JsonIgnore
    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Odd> odds;

    
    //many to one de game para expert
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "expert_id", referencedColumnName = "id")
    private Expert expert;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<GamesInOneBet> games;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<User_follows_game> followingUsers;

    


    public Game(){
        
    }

    public Game(String sport, String participants, Timestamp date, Expert expert, String name, String score){
        this.sport = sport;
        this.participants = participants;
        this.date = date;
        this.state = "TBD";
        this.expert = expert;
        this.name = name;
        this.score = score;
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
    public String getName() {
        return name;
    }
    public String getParticipants() {
        return this.participants;
    }
    public List<GamesInOneBet> getGames() {
        return games;
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
    public void setName(String name) {
        this.name = name;
    }
    public void setExpert(Expert expert) {
        this.expert = expert;
    }
    public void setParticipants(String participants) {
        this.participants = participants;
    }
    public void setScore(String score) {
        this.score = score;
    }
    public void setFollowingUsers(Set<User_follows_game> followingUsers) {
        this.followingUsers = followingUsers;
    }


    public List<Odd> getOdds() {
        List<Odd> r = new ArrayList<>();
        for (Odd d : this.odds)
            r.add(d.clone());
        return r;
    }


    @Override
    public String toString() {
        return "" + this.id + " | " + this.sport + " | " + this.participants + " | " + this.date;
    }

    public boolean equals(Object o){
        if(this == o) return true;
        if ((o == null) || (o.getClass() != this.getClass())) return false;

        Game g = (Game) o;

        return this.sport.equals(g.getSport()) && g.getParticipants().equals(this.participants) 
                                               && g.getDate().equals(this.date);
    }

	@Override
	public void registerObserver(User_follows_game ufg) {
        this.followingUsers.add(ufg);
    }

	@Override
	public int removeObserver(User user) {
        for(User_follows_game ufg : this.followingUsers){
            if(ufg.getUser().equals(user)){
                this.followingUsers.remove(ufg);
                return ufg.getId();
            }
        }
        return -1;
	}

	@Override
	public void notifyObservers() {
		for(User_follows_game ufg : this.followingUsers){
            ufg.getUser().update();
        }
	}








}