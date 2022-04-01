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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group.dto.AccountDto;
import com.group.entity.Account;
import com.group.form.CreatingAccountForm;
import com.group.service.AccountSer.IAccountService;

@RestController
@RequestMapping(value = "api/accounts")
public class AccountController {
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired IAccountService accountService;
	
	@GetMapping()
	public Page<AccountDto> getAllAccounts(Pageable pageable, @RequestParam(value = "search", required = false) String search){
		Page<Account> entitiesPages = accountService.getAllAccounts(pageable, search);
		
		List<AccountDto> listAccountDTOs = modelMapper.map(entitiesPages.getContent(),
				new TypeToken<List<AccountDto>>() {}.getType());
		
		Page<AccountDto> dPages = new PageImpl<>(listAccountDTOs,pageable, entitiesPages.getTotalElements());
		return dPages;
	}
	
	@PostMapping()
	public void createAccount (@RequestBody CreatingAccountForm form) {
		TypeMap<CreatingAccountForm, Account> typeMap = modelMapper
														.getTypeMap(CreatingAccountForm.class
																, Account.class);
		if(typeMap == null) {
			modelMapper.addMappings(new PropertyMap<CreatingAccountForm, Account>() {

				@Override
				protected void configure() {
					skip(destination.getId());
					
				}
				
			});
			accountService.createAccount(form);
		}
	}
}
