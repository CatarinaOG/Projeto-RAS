package TP.RasBet.model;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.TreeSet;
import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.*;

import TP.RasBet.config.AesEncryptor;
import TP.RasBet.services.EmailSenderService;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@Table(name = "user")
public class User implements Serializable, Observer{

    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "email")
    private String email;

    @Convert(converter = AesEncryptor.class)
    @Column(name = "password")
    private String password;

    @Column(name = "phone")
    private String phone;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "nif")
    private String nif;

    @Column(name = "cc")
    private String cc;
    
    @Column(name = "wallet")
    private float wallet;
    
    @Column(name="data_de_nascimento")
    private Timestamp data_de_nascimento;
     

    //one to many com Transaction -> User é a tabela que mapeia
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transaction> transactions;


    // one to many com Bet -> User é a tabela que mapeia
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Bet> bets;

    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<User_follows_game> followingGames;


    public User(){
        
    }

    public User(String email, String password, String telefone , String nome, String address, String nif, String cc, Timestamp data_de_nascimento){
        this.email = email;
        this.password = password;
        this.phone = telefone;
        this.name = nome;
        this.address = address;
        this.nif = nif;
        this.cc = cc;
        this.wallet = 0.0f;
        this.data_de_nascimento = data_de_nascimento;
        this.followingGames = new TreeSet<>();
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
    public List<Bet> getBets() {
        return this.bets;
    }
    public List<Transaction> getTransactions(){
        return this.transactions;
    }

    public Set<User_follows_game> getFollowingGames(){
        return this.followingGames;
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
    public void setBets(List<Bet> bets) {
        this.bets = bets;
    }

    public void setFollowingGames(Set<User_follows_game> followingGames){
        this.followingGames = followingGames;
    }

    public void addFollowingGame(User_follows_game ufg){
        this.followingGames.add(ufg);
    }

    public void deleteFollowingGame(User_follows_game ufg){
        this.followingGames.remove(ufg);
    }


    public void update(){
        EmailSenderService emailSenderService = new EmailSenderService();
        emailSenderService.updateOdd(this.email);
    }




    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", phone='" + phone + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", nif='" + nif + '\'' +
                ", cc='" + cc + '\'' +
                ", wallet=" + wallet +
                ", transactions=" + transactions +
                ", bets=" + bets +
                '}';
    }


}

