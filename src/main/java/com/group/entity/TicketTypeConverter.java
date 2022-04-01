package com.group.entity;

import javax.persistence.AttributeConverter;

import com.group.entity.OrderlineTicket.TicketType;

public class TicketTypeConverter implements AttributeConverter<TicketType, String> {

	@Override
	public String convertToDatabaseColumn(TicketType name) {
		// TODO Auto-generated method stub
		if(name == null) {
			return null;
		}
		return name.getValue();
	}

	@Override
	public TicketType convertToEntityAttribute(String value) {
		// TODO Auto-generated method stub
		return TicketType.of(value);
	}

}
