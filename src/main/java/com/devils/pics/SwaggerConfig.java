package com.devils.pics;

import static com.google.common.base.Predicates.or;
import static springfox.documentation.builders.PathSelectors.regex;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.common.base.Predicate;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	@Bean
	public Docket postsApi() {
		return new Docket(DocumentationType.SWAGGER_2).groupName("public-api")
				.apiInfo(apiInfo()).select()
                .apis(RequestHandlerSelectors.any()) // 현재 RequestMapping으로 할당된 모든 URL 리스트를 추출
                .paths(PathSelectors.ant("/**")) // 그중 /api/** 인 URL들만 필터링
                .build();
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title("Pics API")
			.description("Pics API Reference for Data Scientists Developers")
			.termsOfServiceUrl("http://localhost:9999")
			.contact(new Contact("DevilS", "http://localhost:9999",
				"pics.devs@gmail.com"))
			.license("Pics License 0.1")
			.licenseUrl("http://localhost:9999")
			.version("0.1")	
			.build();
	}
		
		//http://localhost:7777/swagger-ui.html
}

