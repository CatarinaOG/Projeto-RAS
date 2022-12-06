package TP.RasBet.services;

import org.json.JSONObject;

public interface IExpertService {
    public String createGame(JSONObject event);
    public String getGames();
}
