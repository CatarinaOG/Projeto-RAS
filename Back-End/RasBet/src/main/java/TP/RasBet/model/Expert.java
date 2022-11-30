package TP.RasBet.model;
import java.util.List;
import java.io.Serializable;
import javax.persistence.*;


@Entity
@Table(name = "expert")
public class Expert implements Serializable{
    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "email")
    @Convert(converter = Encrypt.class)
    private String email;

    @Column(name = "password")
    @Convert(converter = Encrypt.class)
    private String password;

    @Column(name = "name")
    @Convert(converter = Encrypt.class)
    private String name;


    // one to many com a tabela Game
    @OneToMany(mappedBy = "expert", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Game> games;


    // many to one com a tabela Admin
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id", referencedColumnName = "id")
    private Admin admin;




    public Expert(){
        
    }

    public Expert(String email, String password, String name, Admin admin){
        this.email = email;
        this.password = password;
        this.name = name;
        this.admin = admin;
    }






    /* Getters */
    public int getId(){
        return this.id;
    }
    public String getEmail(){
        return this.email;
    }
    public String getPassword(){
        return this.password;
    }
    public String getName() {
        return name;
    }
    public Admin getAdmin() {
        return admin;
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
    public void setAdmin(Admin admin) {
        this.admin = admin;
    }

    @Override
    public String toString(){
        return this.id + " | " + this.games.toString();
    }

}
