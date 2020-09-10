package com.devils.pics.controller;

import java.util.Map;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Chat;

@RestController
public class ChatController {
	
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
}
