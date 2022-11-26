package TP.RasBet.model;

public class ChangeProfileForm {
    private String name;
    private String phone_num;
    private String passoword;
    private String new_add;
    private String email_user;


    public String getName(){
        return this.name;
    }
    public String getPhone_num() {
        return this.phone_num;
    }
    public String getPassoword() {
        return this.passoword;
    }
    public String getNew_add() {
        return this.new_add;
    }
    public String getEmail_user() {
        return this.email_user;
    }
    
    public void setPhone_num(String phone_num) {
        this.phone_num = phone_num;
    }
    public void setPassoword(String passoword) {
        this.passoword = passoword;
    }
    public void setNew_add(String new_add) {
        this.new_add = new_add;
    }
    public void setEmail_user(String email_user) {
        this.email_user = email_user;
    }

}

