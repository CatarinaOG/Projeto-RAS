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


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bet_id", referencedColumnName="id")
    private Bet bet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", referencedColumnName="id")
    private Game game;


    public GamesInOneBet(){

    }

    public GamesInOneBet(float odd){
        this.odd = odd;
    }


    public int getId(){
        return this.id;
    }

    public float getOdd(){
        return this.odd;
    }

    public void setBet(Bet bet) {
        this.bet = bet;
    }
    public void setGame(Game game) {
        this.game = game;
    }


}