package com.hackatoon.truesightbackend.service;

import com.hackatoon.truesightbackend.model.BattleData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.MalformedURLException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@Service
public class WatsonHttpApiService {

    @Value("${ibm.watson.api.key}")
    private String apiKey;

    @Value("${ibm.watson.token.url}")
    private String tokenUrl;

    @Value("${ibm.watson.predict.url}")
    private String predictUrl;

    public String predict(String fieldValues) throws IOException{

            // NOTE: you must manually set API_KEY below using information retrieved from your IBM Cloud account.
            String response;
            String API_KEY = apiKey;
            String TOKEN_URL = tokenUrl;
            String PREDICT_URL = predictUrl;

            HttpURLConnection tokenConnection = null;
            HttpURLConnection scoringConnection = null;
            BufferedReader tokenBuffer = null;
            BufferedReader scoringBuffer = null;
            try {
                // Getting IAM token
                URL tokenUrl = new URL(TOKEN_URL + API_KEY);
                tokenConnection = (HttpURLConnection) tokenUrl.openConnection();
                tokenConnection.setDoInput(true);
                tokenConnection.setDoOutput(true);
                tokenConnection.setRequestMethod("POST");
                tokenConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
                tokenConnection.setRequestProperty("Accept", "application/json");
                tokenBuffer = new BufferedReader(new InputStreamReader(tokenConnection.getInputStream()));
                StringBuffer jsonString = new StringBuffer();
                String line;
                while ((line = tokenBuffer.readLine()) != null) {
                    jsonString.append(line);
                }
                // Scoring request
                URL scoringUrl = new URL(PREDICT_URL);
                String iam_token = "Bearer " + jsonString.toString().split(":")[1].split("\"")[1];
                scoringConnection = (HttpURLConnection) scoringUrl.openConnection();
                scoringConnection.setDoInput(true);
                scoringConnection.setDoOutput(true);
                scoringConnection.setRequestMethod("POST");
                scoringConnection.setRequestProperty("Accept", "application/json");
                scoringConnection.setRequestProperty("Authorization", iam_token);
                scoringConnection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
                OutputStreamWriter writer = new OutputStreamWriter(scoringConnection.getOutputStream(), "UTF-8");

                // NOTE: manually define and pass the array(s) of values to be scored in the next line
                String payload = "{\"input_data\": [{\"fields\": [\"ID\",\"PlayerID\",\"Kills\",\"Deaths\",\"Assists\",\"Creep Score\",\"Gold Earned\"], \"values\": " + fieldValues + "}]}";
                writer.write(payload);
                writer.close();

                scoringBuffer = new BufferedReader(new InputStreamReader(scoringConnection.getInputStream()));
                StringBuffer jsonStringScoring = new StringBuffer();
                String lineScoring;
                while ((lineScoring = scoringBuffer.readLine()) != null) {
                    jsonStringScoring.append(lineScoring);
                }
                response = jsonStringScoring.toString();
                return response;
            } catch (IOException e) {
                response = e.getMessage();
            }
            finally {
                if (tokenConnection != null) {
                    tokenConnection.disconnect();
                }
                if (tokenBuffer != null) {
                    tokenBuffer.close();
                }
                if (scoringConnection != null) {
                    scoringConnection.disconnect();
                }
                if (scoringBuffer != null) {
                    scoringBuffer.close();
                }
            }
            return response;
    }
}