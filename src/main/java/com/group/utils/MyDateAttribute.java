package com.group.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class MyDateAttribute implements AttributeConverter<Date, String> {

	@Override
	public String convertToDatabaseColumn(Date entityDate) {
		// TODO Auto-generated method stub
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		return format.format(entityDate);
	}

	@Override
	public Date convertToEntityAttribute(String dbData) {
		// TODO Auto-generated method stub
		
		try {
			
			SimpleDateFormat  format = new SimpleDateFormat("yyyy-MM-dd");
			return format.parse(dbData);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		
	}

}
