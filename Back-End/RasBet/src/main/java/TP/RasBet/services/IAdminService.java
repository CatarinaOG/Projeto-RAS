package TP.RasBet.services;

import org.json.JSONObject;

import TP.RasBet.model.*;

public interface IAdminService {

    public String createExpert(JSONObject registerForm);
    public String deleteExpert(int id);
    public String getExperts();
}
