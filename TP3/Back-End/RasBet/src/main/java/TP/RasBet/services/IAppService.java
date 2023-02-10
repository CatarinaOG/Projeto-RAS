package TP.RasBet.services;



import org.json.JSONObject;
import TP.RasBet.model.*;


public interface IAppService {
    public JSONObject getGames(String email);
    public String placeBet(JSONObject betslipForm);
    public String changeOdd(JSONObject oddForm);
    public String insertOdd(JSONObject oddForm);
    public String getGamesFiltered(String participant);
    public void updateStatus();


}
