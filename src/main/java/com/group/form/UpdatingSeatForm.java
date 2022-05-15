package com.group.form;

import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UpdatingSeatForm {
	@NotNull
	private String seatStatus;
	@NotNull
	private int ticketId;
}
