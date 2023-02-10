package TP.RasBet.config;

import java.util.List;

import org.json.JSONObject;

public class Logs{

    public static String returnLogTrue(){
        JSONObject j = new JSONObject();
        j.put("confirmed", "true");
        return j.toString();
    }
    
    public static String returnLogFalse(){
        JSONObject j = new JSONObject();
        j.put("confirmed", "false");
        return j.toString();
    }

    public static String returnLogFalse(int errorType){
        JSONObject j = new JSONObject();
        j.put("confirmed", "\"" + errorType + "\"");
        return j.toString();
    }
    
    public static String buildJSON(Object ... args){
        JSONObject j = new JSONObject();
        for (int i = 0; i < args.length; i+=2){
            j.put(args[i].toString(), args[i+1].toString());
        }
        return j.toString();
    }

}
