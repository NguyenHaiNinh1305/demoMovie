package com.group.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {
	boolean existsByAccountName(String accountName);
	Account findByAccountName(String accountName);
}
