package com.group.dto;

import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
@Data
@NoArgsConstructor
public class AccountDto {
	
	@NonNull
	 private int id;

	@NotNull
	private String accountName;
	 @NotNull
    private String role;
    
    @NotNull
    private short age;
    
    @NotNull
    private String email;
   
}
