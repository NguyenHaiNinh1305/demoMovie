package com.group.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration

public class ComponentConfig {
	@Bean
	public ModelMapper initModelMapper() {
		return new ModelMapper();
	}
}
