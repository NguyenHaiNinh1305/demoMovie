package com.group.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class MyTimeAttribute implements AttributeConverter<Date, String> {

	@Override
	public String convertToDatabaseColumn(Date entityDate) {
		// TODO Auto-generated method stub
		SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");
		return format.format(entityDate);
	}

	@Override
	public Date convertToEntityAttribute(String dbData) {
		// TODO Auto-generated method stub
		
		try {
			
			DateFormat  format = new SimpleDateFormat("HH:mm:ss");
			return format.parse(dbData);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		
	}

}
