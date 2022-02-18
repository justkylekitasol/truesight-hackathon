package com.hackatoon.truesightbackend.repository;

import com.hackatoon.truesightbackend.model.BattleData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BattleDataRepository extends JpaRepository<BattleData, Long> {
}
