package com.group.form;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

import org.hibernate.validator.constraints.Length;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class CreatingSnackForm {
	
	@NotNull
	@NotBlank(message = "must not be null")
	@Length(max = 1000)
	private String picture;

	@NotNull
	@NotBlank(message = "must not be null")
	@Length(max = 100)
	private String snackname;

	@NotNull
	@NotBlank(message = "must not be null")
	@PositiveOrZero(message = "must be geater or equal 0")
	private double snackprice;
}
