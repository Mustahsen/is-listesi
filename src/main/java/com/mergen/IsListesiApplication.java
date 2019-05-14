package com.mergen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
//@RestController
public class IsListesiApplication extends SpringBootServletInitializer {
	
	/*@RequestMapping("/user")
	public Principal user(Principal user) {
		return user;
	}
	
	@RequestMapping("/resource")
	@ResponseBody
	public Map<String, Object> home() {
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("id", UUID.randomUUID().toString());
		model.put("content", "Hello World");
		return model;
	}
	
	@Configuration
	@Order(SecurityProperties.BASIC_AUTH_ORDER)
	protected static class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Override
	protected void configure(HttpSecurity http) throws Exception {
	      http
	      	.httpBasic()
	      .and()
	      	.authorizeRequests()
	      		.antMatchers("/index.html", "/", "/home", "/login").permitAll()
	      		.anyRequest().authenticated();
	    }
    }*/

	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(IsListesiApplication.class);
	}
	
	public static void main(String[] args) {
		SpringApplication.run(IsListesiApplication.class, args);
	}

}
