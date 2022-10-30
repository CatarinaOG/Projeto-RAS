package TP.RasBet.model;
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

    //@ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name = "restaurante_nome", referencedColumnName = "nome")
    //private Game games;

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
