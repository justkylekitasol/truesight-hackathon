package com.hackatoon.truesightbackend.controller;

import com.hackatoon.truesightbackend.model.BattleData;
import com.hackatoon.truesightbackend.service.BattleDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/battle-data")
public class BattleDataController {

    @Autowired
    private BattleDataService battleDataService;

    @GetMapping
    public List<BattleData> list(){
        return battleDataService.list();
    }

    @GetMapping("{id}")
    public BattleData get(@PathVariable("id") Long id){
        return battleDataService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BattleData create(@RequestBody final BattleData session) {
        return battleDataService.save(session);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public BattleData update(@PathVariable Long id, @RequestBody BattleData battleData) {
        return battleDataService.update(id, battleData);
    }

}
