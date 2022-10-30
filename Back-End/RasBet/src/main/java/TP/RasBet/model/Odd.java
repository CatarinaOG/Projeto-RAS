package TP.RasBet.model;

import javax.persistence.*;



@Entity
@Table(name = "Odd")
public class Odd{

    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "Description")
    private String description;

    @Column(name = "Value")
    private String value;


    // many to one com a tabela Game
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Game_id", referencedColumnName = "id")
    private Game game;





    public Odd(){
        
    }






    /* Getters */

    public int getId(){
        return this.id;
    }

    public String getDescription(){
        return this.description;
    }

    public String getValue(){
        return this.value;
    }




    /* Setters */

    public void setId(int id){
        this.id = id;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public void setValue(String value){
        this.value = value;
    }

}