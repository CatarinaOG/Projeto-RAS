package TP.RasBet.model;

import java.sql.Date;

public class RegisterForm {
    private String nome;
    private String email;
    private String password;
    private Date dataDeNascimento;
    private String cc;
    private String nif;
    private String telefone;
    private String morada;


    /* getters */
    public String getNif() {
        return nif;
    }
    public String getCc() {
        return cc;
    }
    public String getNome() {
        return nome;
    }
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }
    public String getTelefone() {
        return telefone;
    }
    public String getMorada() {
        return morada;
    }
    public Date getDataDeNascimento() {
        return dataDeNascimento;
    }

    /* setters */
    public void setNome(String nome) {
        this.nome = nome;
    }
    public void setCc(String cc) {
        this.cc = cc;
    }
    public void setNif(String nif) {
        this.nif = nif;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
    public void setMorada(String morada) {
        this.morada = morada;
    }

}
