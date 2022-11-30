package TP.RasBet.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="games_in_one_bet")
public class GamesInOneBet implements Serializable{


    @Id
    @GeneratedValue
    @Column(name="id")
    private int id;

    @Column(name = "odd")
    private float odd;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bet_id", referencedColumnName="id")
    private Bet bet;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "game_id", referencedColumnName="id")
    private Game game;


    public GamesInOneBet(){

    }

    public GamesInOneBet(float odd, String description){
        this.odd = odd;
        this.description = description;
    }


    public int getId(){
        return this.id;
    }

    public float getOdd(){
        return this.odd;
    }

    public Game getGame(){
        return this.game;
    }

    public Bet getBet(){
        return this.bet;
    }
    public String getDescription() {
        return description;
    }




    public void setBet(Bet bet) {
        this.bet = bet;
    }
    public void setGame(Game game) {
        this.game = game;
    }


}