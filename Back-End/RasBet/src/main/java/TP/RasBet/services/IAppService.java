package TP.RasBet.services;



import org.json.JSONObject;
import TP.RasBet.model.*;


public interface IAppService {
    public JSONObject getGames();
    public String placeBet(BetslipForm betslipForm);
    public String changeOdd(OddForm oddForm);
    public String insertOdd(OddForm oddForm);
    public String getGamesFiltered(String participant);
    public void updateStatus();


}
