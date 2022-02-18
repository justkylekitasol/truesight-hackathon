package com.hackatoon.truesightbackend.service;

import com.hackatoon.truesightbackend.model.BattleData;
import com.hackatoon.truesightbackend.repository.BattleDataRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BattleDataService {

    @Autowired()
    private BattleDataRepository battleDataRepository;

    public List<BattleData> list(){
        return battleDataRepository.findAll();
    }

    public BattleData getById(Long id){
        return battleDataRepository.getById(id);
    }


    public BattleData save(BattleData session) {
        return battleDataRepository.saveAndFlush(session);
    }

    public List<BattleData> saveAll(List<BattleData> battleDataList) {
        return battleDataRepository.saveAll(battleDataList);
    }

    public BattleData update(Long id, BattleData battleData) {
        BattleData existingBattleData = battleDataRepository.getById(id);
        BeanUtils.copyProperties(battleData, existingBattleData, "id");
        return battleDataRepository.saveAndFlush(existingBattleData);
    }

}
