package TP.RasBet.services;

import TP.RasBet.model.*;

public interface IAdminService {

    public String createExpert(RegisterForm registerForm);
    public String deleteExpert(int id);
    public String getExperts();
}
