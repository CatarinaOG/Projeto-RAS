package TP.RasBet.model;
import java.util.List;

import javax.persistence.*;


@Entity
@Table(name = "User")
public class User{

    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "phone")
    private String phone;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "NIF")
    private String nif;

    @Column(name = "CC")
    private String cc;
    
    @Column(name = "wallet")
    private float wallet;
    

    //one to many com Transaction -> User é a tabela que mapeia
    @OneToMany(mappedBy = "User", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transaction> transactions;


    // one to many com Bet -> User é a tabela que mapeia
    @OneToMany(mappedBy = "User", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Bet> bets;





    public User(){
        
    }







    /* Getters */
    public String getEmail(){
        return this.email;
    }
    public String getPassword(){
        return this.password;
    }

    public String getPhone(){
        return this.phone;
    }

    public String getName(){
        return this.name;
    }
    public String getAddress(){
        return this.address;
    }
    public String getNIF(){
        return this.nif;
    }
    public String getCC(){
        return this.cc;
    }
    public float getWallet(){
        return this.wallet;
    }

    /* Setters */
    public void setEmail(String email){
        this.email = email;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public void setPhone(String phone){
        this.phone = phone;
    }
    public void setName(String name){
        this.name = name;
    }
    public void setAddress(String address){
        this.address = address;
    }
    public void setNIF(String nif){
        this.nif = nif;
    }
    public void setCC(String cc){
        this.cc = cc;
    }
    public void setWallet(float wallet){
        this.wallet = wallet;
    }
    
}

