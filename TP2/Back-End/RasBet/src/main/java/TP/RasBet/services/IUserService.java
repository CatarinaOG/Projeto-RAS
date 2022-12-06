package TP.RasBet.services;

import org.json.JSONObject;

public interface IUserService {
    public String login(String email, String pass);
    public String register(JSONObject rf);
    public String getBetHistory(String email);
    public String changeProfile(JSONObject cpf);
    public String changeSensitive(JSONObject cpf);
    public String getCode(String email);
    public String getTransactionHistory(String email);
    public String recoverPassword(String email);
}
