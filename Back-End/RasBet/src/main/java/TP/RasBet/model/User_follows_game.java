package TP.RasBet.model;

import TP.RasBet.model.*;

import java.io.Serializable;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
@Table(name="user_follows_game")
public class User_follows_game implements Serializable{
    
    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName="id")
    private User user;

    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "game_id", referencedColumnName="id")
    private Game game;


    public User_follows_game(User user, Game game){
        this.user = user;
        this.game = game;
    }

    public int getId(){
        return this.id;
    }

    public User getUser(){
        return this.user;
    }

    public Game getGame(){
        return this.game;
    }

    public void setUser(User user){
        this.user = user;
    }

    public void setGame(Game game){
        this.game = game;
    }



}