package com.group.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group.entity.Snack;

public interface SnackRepository extends JpaRepository<Snack, Integer>{

}
