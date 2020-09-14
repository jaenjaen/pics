package com.devils.pics.controller;

import java.util.ArrayList;
import java.util.HashMap;
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

	/* 이제까지의 해당되는 스튜디오, 고객의 대화 모두를 가져옴 */
	@GetMapping("/chat/prev/{stuId}/{custId}")
	public ResponseEntity getAllChat(@PathVariable String stuId, @PathVariable String custId) {
		try {
			Map map = new HashMap();
			map.put("stuId", stuId);
			map.put("custId", custId);
			List<Chat> list = chatService.getPrevAllChat(map);
			if(list.size()>0) {
				return new ResponseEntity(list, HttpStatus.OK);
			}else { //해당되는 대화가 없을 경우
				return new ResponseEntity(-1, HttpStatus.OK);
			}
		}catch(Exception e) {
			//e.printStackTrace();
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}
	
	/* 최근 수신 대화 가져오기(com, studio, cust, chat 정보 추출)  */
	@GetMapping("/chat/recent/{member}/{id}")
	public ResponseEntity getRecentComChat(@PathVariable String member, @PathVariable String id) {
		List<Map<String, String>> recentChat = new ArrayList<>();
		try {
			if(member.equals("com")) { //기업으로 로그인 했을 경우
				recentChat = chatService.getRecentComChat(id);
				//System.out.println(recentChat);
			}else if(member.equals("cust")) { //고객으로 로그인 했을 경우
				recentChat = chatService.getRecentCustChat(id);
				//System.out.println(recentChat);
			}
			
			if(recentChat.size()>0) {
				return new ResponseEntity(recentChat, HttpStatus.OK);
			}else { //해당되는 대화가 없을 경우
				return new ResponseEntity(-1, HttpStatus.OK);
			}
			
		} catch (Exception e) {
			//e.printStackTrace();
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}
	
	/* 채팅 상대 기본 정보 가져오기 */
	@GetMapping("/chat/info/{member}/{id}")
	public ResponseEntity getDefaultInfo(@PathVariable String member, @PathVariable String id) {
		System.out.println(member);
		System.out.println(id);
		Map map = new HashMap();
		try {
			if(member.equals("stu")) { //스튜디오 정보 가져오기
				map = chatService.getStuDefaultInfo(id);
				System.out.println("성공했당");
				System.out.println(map);
			}else if(member.equals("cust")) { //고객 정보 가져오기
				map = chatService.getCustDefaultInfo(id);
				//System.out.println(map);
			}
			
			if(map != null) {
				return new ResponseEntity(map, HttpStatus.OK);
			}else { //해당되는 상대가 없을 경우
				return new ResponseEntity(-1, HttpStatus.OK);
			}
		} catch (Exception e) {
			//e.printStackTrace();
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}
}
