package com.mergen;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.mergen.user.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Autowired
	UserService userService;
	
	@Autowired 
	private MyBasicAuthenticationEntryPoint myBasicAuthenticationEntryPoint;
	
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		http
        .httpBasic().authenticationEntryPoint(myBasicAuthenticationEntryPoint)
        .and()
        .authorizeRequests()
            .antMatchers("/", "/generateUser", "/authenticateUser", "/error", "/*.js", "/*.js.map", "glyphicons*").permitAll()
            .anyRequest().authenticated()
        .and()
        .csrf()
            .disable();
    }
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	}
}
