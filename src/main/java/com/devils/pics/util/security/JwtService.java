package com.devils.pics.util.security;

import java.util.Date;
import java.util.Map;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.devils.pics.domain.Company;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtService {
	
	@Value("${jwt.salt}")
	private String salt;
	
	@Value("${jwt.expmin}")
	private Long expireMin;
	
	
	/**
	 * 로그인 성공 시 사용자 정보를 기반으로 JWT Token 반환
	 * @param company
	 * @return */
	public String create(Company company) {
		JwtBuilder builder = Jwts.builder();
		
		//header
		builder.setHeaderParam("typ","JWT");
		//payload
		builder.setSubject("loginToken")
		.setExpiration(new Date(System.currentTimeMillis()+ 1000 * 60 * expireMin)) // 만료기간 설정
		.claim("Company",company); //토큰 내부 중요한 내용 추가
		
		//signature
		builder.signWith(SignatureAlgorithm.HS256, salt.getBytes());
		
		//serialize
		String jwt = builder.compact();
		//System.out.println("토큰발행: "+jwt);
	
		return jwt;
	}
	
	
	/**
	 * 전달받은 토큰의 유효성 검사
	 * @param jwt*/
	
	public void vaildChekc(String jwt) {
		//if NOT exception, OK
		Jwts.parser().setSigningKey(salt.getBytes()).parseClaimsJws(jwt);
	}
	
	/**
	 * jwt 토큰을 활용해서 필요한 정보 반환
	 * @param jwt
	 */
	
	public Map<String,Object> getToken(String jwt){
		Jws<Claims> claims = null;
		try {
			claims = Jwts.parser().setSigningKey(salt.getBytes()).parseClaimsJws(jwt);
		}catch(RuntimeException e) {
			throw new RuntimeException(e);
		}
		return claims.getBody();
	}
}
