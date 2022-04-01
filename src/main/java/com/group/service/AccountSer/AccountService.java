package com.group.service.AccountSer;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.group.entity.Account;
import com.group.form.CreatingAccountForm;
import com.group.respository.AccountRepository;

@Service
public class AccountService implements IAccountService {
	
	@Autowired
	private AccountRepository accountRepository;
	@Autowired 
	private ModelMapper modelMapper;

	@Override
	public Page<Account> getAllAccounts(Pageable pageable, String search) {
		// TODO Auto-generated method stub
		return accountRepository.findAll(pageable);
	}

	@Override
	public Account getAccountById(int id) {
		// TODO Auto-generated method stub
		return accountRepository.findById(id).get();
	}

	@Override
	public void createAccount(CreatingAccountForm form) {
		// TODO Auto-generated method stub
		Account account = modelMapper.map(form, Account.class);
		
		accountRepository.save(account);
	}

	@Override
	public boolean isAccountExistsByAccountName(String accountName) {
		// TODO Auto-generated method stub
		return accountRepository.existsByAccountName(accountName);
	}

	@Override
	public Account getAccountByAccountName(String accountName) {
		// TODO Auto-generated method stub
		return accountRepository.findByAccountName(accountName);
	}

	@Override
	public UserDetails loadUserByUsername(String accountName) throws UsernameNotFoundException {
		Account account = accountRepository.findByAccountName(accountName);
		if(account == null) {
			throw new UsernameNotFoundException(accountName);
		}
		
		return new User(account.getAccountName(),
				account.getPassword(), 
				AuthorityUtils.createAuthorityList(account.getRole().toString()));
			}

	
	

}
