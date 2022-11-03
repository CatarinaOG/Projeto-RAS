package TP.RasBet.model;

import javax.persistence.*;
import java.io.Serializable;



@Entity
@Table(name = "odd")
public class Odd implements Serializable{

    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "description")
    private String description;

    @Column(name = "value")
    private float value;



      
    // many to one com a tabela Game
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", referencedColumnName = "id")
    private Game game;





    public Odd(){

    }

    public Odd(String description, float value){
        this.description = description;
        this.value = value;
    }


    public Odd(Odd d){
        this.description = d.getDescription();
        this.value = d.getValue();
        this.id = d.getId();
    }




    /* Getters */

    public int getId(){
        return this.id;
    }

    public String getDescription(){
        return this.description;
    }

    public float getValue(){
        return this.value;
    }
    
    public Game getGame() {
        return game;
    }

    /* Setters */

    public void setId(int id){
        this.id = id;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public void setValue(float value){
        this.value = value;
    }
    public void setGame(Game game) {
        this.game = game;
    }

    public Odd clone(){
        return new Odd(this);
    }

}