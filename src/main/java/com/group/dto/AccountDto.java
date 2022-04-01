package com.group.dto;

import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class AccountDto {
	
	
	 

	@NotNull
	private String accountName;
	 @NotNull
    private String role;
    
    @NotNull
    private short age;
    
    @NotNull
    private String email;
   
}
