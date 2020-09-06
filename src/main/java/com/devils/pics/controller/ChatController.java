package com.devils.pics.controller;

import java.util.Map;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Chat;

@RestController
public class ChatController {
	
//	@MessageMapping("/receive") //receive를 메세지를 받을 endpoing로 설정
//	@SendTo("/send") //send로 메세지를 반환
//	public ResponseEntity ChatHandler(@RequestBody Map map) {
//		int sender = chat.getSender();
//		int custId = chat.getCustId();
//		int stuId = chat.getStuId();
//		
//		if(sender == custId) { //보낸 사람이 고객일 경우
//			
//		}
//		else if(sender == stuId) { //보낸 사람이 스튜디오일 경우
//			
//		}
//	}
}
