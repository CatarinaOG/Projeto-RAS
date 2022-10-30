package TP.RasBet.model;
import java.util.List;

import javax.persistence.*;


@Entity
@Table(name = "Expert")
public class Expert{
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;


    // one to many com a tabela Game
    @OneToMany(mappedBy = "Expert", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Game> games;


    // many to one com a tabela Admin
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Admin_id", referencedColumnName = "id")
    private Admin admin;




    public Expert(){
        
    }






    /* Getters */
    public String getEmail(){
        return this.email;
    }
    public String getPassword(){
        return this.password;
    }

    /* Setters */
    public void setEmail(String email){
        this.email = email;
    }
    public void setPassword(String password){
        this.password = password;
    }
}
