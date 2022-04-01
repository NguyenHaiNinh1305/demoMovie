package com.group.form;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

import org.hibernate.validator.constraints.Length;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatingAccountForm {
	
    @NotBlank(message = "must not be null")
    @Length(max = 100)
	private String accountName;
    
    @Pattern(regexp = "staff", message = "only create staff")
    private String role;
    
    @Positive(message = "must be greater than 0")
    private short age;
    
    @NotNull
    @Pattern(regexp = "[a-z0-9]+@[a-z]+\\.[a-z]{2,3}", message = "email format must be aa123@abc.abc ")
    private String email;
    
    @NotNull
    private String password;

}
