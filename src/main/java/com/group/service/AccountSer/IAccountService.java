package com.group.service.AccountSer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.group.entity.Account;
import com.group.form.CreatingAccountForm;


public interface IAccountService extends UserDetailsService{
	public Page<Account> getAllAccounts(Pageable pageable, String search);

	public Account getAccountById(int id);

	public void createAccount(CreatingAccountForm form);

	public boolean isAccountExistsByAccountName(String accountName);

	public Account getAccountByAccountName(String accountName);
}
