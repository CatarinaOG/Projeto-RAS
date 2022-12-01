package TP.RasBet.model;
import java.util.List;
import java.io.Serializable;

import javax.persistence.*;


@Entity
@Table(name = "admin")
public class Admin implements Serializable{

    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    //one to many com a tabela expert
    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
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
    public String getName() {
        return name;
    }

    /* Setters */
    public void setEmail(String email){
        this.email = email;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public void setName(String name) {
        this.name = name;
    }
}