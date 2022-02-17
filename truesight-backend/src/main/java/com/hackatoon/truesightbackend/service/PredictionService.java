package com.hackatoon.truesightbackend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackatoon.truesightbackend.model.BattleData;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PredictionService {

    @Autowired
    WatsonHttpApiService watsonHttpApiService;

    public List<BattleData> predict(List<BattleData> battleDataList) throws IOException, JSONException {
        List<BattleData> response = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();

        Integer[][] payloadValue = new Integer[battleDataList.size()][];
        for (int i = 0; i < payloadValue.length; i++) {
            BattleData battleData = battleDataList.get(i);
            Integer[] payloadItem = {Integer.valueOf(Math.toIntExact(battleData.getId())), Integer.valueOf(battleData.getPlayerId()), battleData.getKills(), battleData.getDeaths(),
                    battleData.getAssists(), battleData.getCreepScore(), battleData.getGoldEarned()};
            payloadValue[i] = payloadItem;
        }

        String fieldValues = objectMapper.writeValueAsString(payloadValue);
        String predictionString = watsonHttpApiService.predict(fieldValues);

        JSONObject predictionJsonObject = new JSONObject(predictionString);
        JSONArray resultArray = predictionJsonObject.getJSONArray("predictions").getJSONObject(0).getJSONArray("values");

        for(int i = 0; i < resultArray.length(); i++){
            if (resultArray.getJSONArray(i).getInt(0) == 0){
                battleDataList.get(i).setFraud(false);
            }else{
                battleDataList.get(i).setFraud(true);
            }
        }
        return battleDataList;
    }

}
