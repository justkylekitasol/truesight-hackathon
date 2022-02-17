package com.hackatoon.truesightbackend.controller;

import com.hackatoon.truesightbackend.model.BattleData;
import com.hackatoon.truesightbackend.service.PredictionService;
import com.hackatoon.truesightbackend.service.WatsonHttpApiService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/predict")
public class PredictionController {


    @Autowired
    PredictionService predictionService;

    @PostMapping()
    public List<BattleData> getPrediction(@RequestBody List<BattleData> battleDataList) throws IOException, JSONException {
        List<BattleData> response = new ArrayList<>();

        response = predictionService.predict(battleDataList);

        return response;
    }

}
