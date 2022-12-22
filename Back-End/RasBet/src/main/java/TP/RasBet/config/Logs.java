package TP.RasBet.config;

import java.util.List;

import org.json.JSONObject;

public class Logs{

    public static String getReturnLog(String key, String value){
        JSONObject j = new JSONObject();
        j.put(key, value);
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
