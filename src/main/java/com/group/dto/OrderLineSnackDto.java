package com.group.dto;

import javax.validation.constraints.NotNull;

import com.group.entity.Snack;
import com.group.entity.OderlineSnack.SnackType;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OrderLineSnackDto {
	
	@NotNull
	private int snacknumber;

	@NotNull
	private String snackType;
	
	@NotNull
	private int  snackID;
	
	private String snackPicture;

}
