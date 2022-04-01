package com.group.form;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

import com.group.entity.Snack;
import com.group.entity.OderlineSnack.SnackType;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatingOrderlineSnackForm {
	@NotNull
	@Positive
	private int snacknumber;

	@NotNull
	@Pattern(regexp = "middle|big|small")
	private String snackType;
	
	@NotNull
	private int  snackID;
}
