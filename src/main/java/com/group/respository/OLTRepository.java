package com.group.respository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.group.entity.OrderlineTicket;


public interface OLTRepository extends JpaRepository<OrderlineTicket, Integer> {

	Page<OrderlineTicket> findAll(Pageable pageable);

}
