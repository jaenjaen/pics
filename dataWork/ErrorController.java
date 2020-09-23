
package com.devils.pics.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.annotations.Api;

@RestController
@CrossOrigin(origins={"*"})
@Api(tags= {"Pics Error-page"})
public class ErrorController  implements org.springframework.boot.web.servlet.error.ErrorController{

	private static final String ERROR_PATH = "/error";
	
	@Override
	public String getErrorPath() {
		return ERROR_PATH;
	}
	
	@RequestMapping("/error")
	public String handleError() {
		return "index.html";
	}

}
