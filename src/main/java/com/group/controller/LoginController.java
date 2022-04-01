package com.group.controller;

import java.security.Principal;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group.dto.AccountDto;
import com.group.entity.Account;
import com.group.service.AccountSer.IAccountService;

@RestController
@RequestMapping(value = "login")
public class LoginController {
	@Autowired
	private IAccountService iAccountService;
	
	@Autowired
	private ModelMapper modelMapper;
	@GetMapping()
	public AccountDto login(Principal principal) {
		String accName = principal.getName();
		Account account = iAccountService.getAccountByAccountName(accName);
		AccountDto accountDTO = modelMapper.map(account, AccountDto.class);
//		AccountDto accountDTO = new AccountDto(account.getEmail());
		return accountDTO;
	}
}
