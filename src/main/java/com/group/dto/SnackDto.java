package com.group.dto;

import javax.validation.constraints.NotNull;

import com.group.entity.Snack.snacktype;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SnackDto {
	private int id;

	@NotNull
	private String picture;

	@NotNull
	private String snackname;

	@NotNull
	private double snackprice;
	
	private snacktype snacktype;
}
