package com.group.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group.dto.AccountDto;
import com.group.entity.Account;
import com.group.entity.Snack;
import com.group.form.CreatingAccountForm;
import com.group.respository.AccountRepository;
import com.group.service.AccountSer.IAccountService;

@RestController
@RequestMapping(value = "api/accounts")
public class AccountController {
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired IAccountService accountService;
	
	@Autowired 
	private AccountRepository repository;
	
	@GetMapping()
	public Page<AccountDto> getAllAccounts(Pageable pageable, @RequestParam(value = "search", required = false) String search){
		Page<Account> entitiesPages = accountService.getAllAccounts(pageable, search);
		
		List<AccountDto> listAccountDTOs = modelMapper.map(entitiesPages.getContent(),
				new TypeToken<List<AccountDto>>() {}.getType());
		
		Page<AccountDto> dPages = new PageImpl<>(listAccountDTOs,pageable, entitiesPages.getTotalElements());
		return dPages;
	}
	
	@GetMapping(value = "once")
	public AccountDto getAccountById(@RequestParam(value = "id", required =  true) int id) {
		Account ac = repository.getById(id);
		AccountDto acdto = modelMapper.map(ac, AccountDto.class);
		return acdto;
	}
	
	
	@PutMapping(value = "update")
	public void updateAccount(@RequestParam(value = "id", required =  true) int id, @RequestBody CreatingAccountForm creatingAccountForm) {
		
		Account ac = repository.getById(id);
		creatingAccountForm.setPassword(ac.getPassword());
		creatingAccountForm.setId(id);
		ac = modelMapper.map(creatingAccountForm, Account.class);
		repository.save(ac);
	}
	
	@DeleteMapping(value  ="delete")
	public void deleteAccount (@RequestParam(value = "id", required =  true) int id) {
		Account ac = repository.getById(id);
		repository.delete(ac);
	}
	
	@PostMapping()
	public void createAccount (@RequestBody CreatingAccountForm form) {
			
		List<Account> listacc =  repository.findAll();
		int id = listacc.get(listacc.size()-1).getId();
		form.setId(id+1);
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		String enCryptPass = bCryptPasswordEncoder.encode(form.getPassword());
		form.setPassword(enCryptPass);
		accountService.createAccount(form);
		}
	}

