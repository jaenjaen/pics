package com.devils.pics.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Chat;
import com.devils.pics.service.ChatService;

@RestController
@CrossOrigin(origins={"*"}, maxAge=6000)
public class ChatController {
	
	@Autowired
	private ChatService chatService;
	
	@MessageMapping("/receive") //receive를 메세지를 받을 endpoing로 설정
	@SendTo("/send") //send로 메세지를 반환
	public Chat ChatHandler(@RequestBody Chat chat) {
		int sender = chat.getSender();
		String word = chat.getWord();
		System.out.println("보낸이 : "+sender);
		System.out.println("내용 : "+word);
		
		Chat result = new Chat();
		result.setSender(sender);
		result.setWord(word);
		
		return result;
	}
	
	/* 업체의 스튜디오 및 고객별 최근 수신 대화  */
	@GetMapping("/recentComChat/{comId}")
	public ResponseEntity getRecentComChat(@PathVariable String comId) {
		try {
			List<Map<String, String>> recentComChat = chatService.getRecentComChat(comId);
			return new ResponseEntity(recentComChat, HttpStatus.OK);
		} catch (Exception e) {
			//e.printStackTrace();
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}
}
