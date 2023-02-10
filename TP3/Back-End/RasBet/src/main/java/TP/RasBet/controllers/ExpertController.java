package TP.RasBet.controllers;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import TP.RasBet.model.*;
import TP.RasBet.services.AppService;
import TP.RasBet.services.ExpertService;;


@RestController
@RequestMapping(path = "api/expert")
public class ExpertController {
    
    @Autowired
    private AppService appService;

    @Autowired
    private ExpertService expertService;

    @PostMapping(value="/newGame")
    public String newGame(@RequestBody String string){
        JSONObject gameForm = new JSONObject(string);
        return expertService.createGame(gameForm);
    }

    //GetJogosCreatedByExpert
    @GetMapping(value="/getGames")
    public String getGames(){
        return expertService.getGames();
    }

    @PostMapping(value="/endGame")
    public void endGame(@RequestBody String body){
        JSONObject game = new JSONObject(body);
        expertService.endGame(game);
    }

    @PostMapping(value="/changeBetState")
    public String changeBetState(@RequestBody String req){
        JSONObject state = new JSONObject(req);
        return expertService.changeBetState(state);
    } 

}
