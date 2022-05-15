package com.group.controller;

import java.security.Principal;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group.dto.AccountDto;
import com.group.entity.Account;
import com.group.form.CreatingAccountForm;
import com.group.respository.AccountRepository;
import com.group.service.AccountSer.IAccountService;

@RestController
@RequestMapping(value = "login")
@CrossOrigin("*")
public class LoginController {
	@Autowired
	private IAccountService iAccountService;
	
	@Autowired
	private AccountRepository repository;
	
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
	
	@PostMapping("/signup")
	public ResponseEntity<?> signupAccount(@RequestBody CreatingAccountForm creatingAccountForm) {
		
		
		Account ac = modelMapper.map(creatingAccountForm, Account.class);
		creatingAccountForm.setRole("staff");
		
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		String enCryptPassword = bCryptPasswordEncoder.encode(creatingAccountForm.getPassword());
		creatingAccountForm.setPassword(enCryptPassword);
		
		iAccountService.createAccount(creatingAccountForm);
		
		
		
		return ResponseEntity.status(HttpStatus.OK).body("ok");
		
	}
	
	@PutMapping("/changepass")
	public void changepassAccount(@RequestParam (value ="password", required = true) String password, 
			@RequestParam(value = "id", required = true) int id) {
		
		
		Account ac = repository.getById(id);
		
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		String enCryptPassword = bCryptPasswordEncoder.encode(password);
		ac.setPassword(enCryptPassword);
		ac.setId(id);
		repository.save(ac);
		
	}
}
