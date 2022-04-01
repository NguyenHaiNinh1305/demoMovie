package com.group.dto;

import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SnackDto {

	@NotNull
	private String picture;

	@NotNull
	private String snackname;

	@NotNull
	private double snackprice;
}
