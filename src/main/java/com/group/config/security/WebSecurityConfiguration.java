package com.group.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.group.service.AccountSer.IAccountService;

@Component
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
	@Autowired IAccountService accountService;
	
	protected void configure (AuthenticationManagerBuilder auth) throws Exception{
		auth.userDetailsService(accountService).passwordEncoder(new BCryptPasswordEncoder());
	}
	
	protected void configure (HttpSecurity httpSecurity) throws Exception {
		httpSecurity.cors()
		.and()
		.authorizeHttpRequests()
		.antMatchers("/v1/**").hasAnyAuthority("admin")
		.antMatchers("/seats/**").hasAnyAuthority("admin", "staff")
		.antMatchers("/api/accounts/**").hasAnyAuthority("admin")
		.antMatchers("/snacks/**").hasAnyAuthority("admin")
		.antMatchers("/ODLs/**").hasAnyAuthority("admin", "staff")
		.antMatchers("/orderlineSnacks/**").hasAnyAuthority("admin", "staff")
		.antMatchers("/tickets/**").hasAnyAuthority("admin", "staff")
		.antMatchers("/orders/**").hasAnyAuthority("admin", "staff")
		.anyRequest()
		.authenticated()
		.and()
		.httpBasic()
		.and()
		.csrf()
		.disable();
	}
}
