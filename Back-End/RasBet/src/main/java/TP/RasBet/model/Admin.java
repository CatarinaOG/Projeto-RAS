package TP.RasBet.model;
import java.util.List;

import javax.persistence.*;


@Entity
@Table(name = "Admin")
public class Admin{

    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;


    //one to many com a tabela expert
    @OneToMany(mappedBy = "Admin", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Expert> experts;


    public Admin(){
        
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