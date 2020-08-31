package com.devils.pics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//import com.devils.pics.util.security.JwtInterceptor;

import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
public class PicsApplication implements WebMvcConfigurer{

	
	public static void main(String[] args) {
		SpringApplication.run(PicsApplication.class, args);
	}
	
	/*
	 * @Autowired private JwtInterceptor jwtinterInterceptor;
	 * 
	 * @Override public void addInterceptors(InterceptorRegistry registry) {
	 * registry.addInterceptor(jwtinterInterceptor).addPathPatterns("/**")
	 * .excludePathPatterns("/company/
	 *"); //토큰 없이 진입할 경로 추가

	}*/
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/*")
				.allowedOrigins("*")
				.allowedMethods("*")
				.allowedHeaders("*")
				.exposedHeaders("jwt-auth-token");
	}	

}
