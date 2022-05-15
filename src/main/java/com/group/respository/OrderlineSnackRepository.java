package com.group.respository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.group.entity.OderlineSnack;

public interface OrderlineSnackRepository extends JpaRepository<OderlineSnack, Integer> {
	Page<OderlineSnack> findAll(Pageable pageable);
}
