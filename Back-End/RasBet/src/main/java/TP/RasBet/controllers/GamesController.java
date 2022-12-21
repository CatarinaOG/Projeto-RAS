package TP.RasBet.controllers;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TP.RasBet.services.AppService;

@RestController
@RequestMapping(path = "api/games")
public class GamesController {
    
    @Autowired
    private AppService appService; 
    
    @GetMapping("/")
    public String getGames(@RequestBody String email){
        JSONObject j = new JSONObject(email);
        return appService.getGames((String) j.get("email")).toString();
    }
    
    @PostMapping("/filtered")    
    public String getGamesFiltered(@RequestBody String filter){
        return appService.getGamesFiltered(filter);
    }


}
