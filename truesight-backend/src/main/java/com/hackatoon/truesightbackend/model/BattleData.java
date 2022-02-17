package com.hackatoon.truesightbackend.model;

public class BattleData {

    private Long id;
    private String team;
    private String playerId;
    private String opponent;
    private String position;
    private String champion;
    private int kills;
    private int deaths;
    private int assists;
    private int creepScore;
    private int goldEarned;
    private String result;
    private boolean isFraud;

    public BattleData(Long id, String team, String playerId, String opponent, String position, String champion, int kills, int deaths, int assists, int creepScore, int goldEarned, String result) {
        this.id = id;
        this.team = team;
        this.playerId = playerId;
        this.opponent = opponent;
        this.position = position;
        this.champion = champion;
        this.kills = kills;
        this.deaths = deaths;
        this.assists = assists;
        this.creepScore = creepScore;
        this.goldEarned = goldEarned;
        this.result = result;
    }

    public BattleData() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getPlayerId() {
        return playerId;
    }

    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }

    public String getOpponent() {
        return opponent;
    }

    public void setOpponent(String opponent) {
        this.opponent = opponent;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getChampion() {
        return champion;
    }

    public void setChampion(String champion) {
        this.champion = champion;
    }

    public int getKills() {
        return kills;
    }

    public void setKills(int kills) {
        this.kills = kills;
    }

    public int getDeaths() {
        return deaths;
    }

    public void setDeaths(int deaths) {
        this.deaths = deaths;
    }

    public int getAssists() {
        return assists;
    }

    public void setAssists(int assists) {
        this.assists = assists;
    }

    public int getCreepScore() {
        return creepScore;
    }

    public void setCreepScore(int creepScore) {
        this.creepScore = creepScore;
    }

    public int getGoldEarned() {
        return goldEarned;
    }

    public void setGoldEarned(int goldEarned) {
        this.goldEarned = goldEarned;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public boolean isFraud() {
        return isFraud;
    }

    public void setFraud(boolean fraud) {
        isFraud = fraud;
    }
}
