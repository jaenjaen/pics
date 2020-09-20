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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Chat;
import com.devils.pics.service.ChatService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins={"*"}, maxAge=6000)
@Api(tags= {"Pics Chatting"})
public class ChatController {
	
	@Autowired
	private ChatService chatService;
	
	@ApiOperation(value="채팅을 DB에 넣고 리턴함", response = Chat.class)
	@MessageMapping("/receive") //receive를 메세지를 받을 endpoint로 설정
	@SendTo("/send") //send로 메세지를 반환
	public Chat ChatHandler(@RequestBody Chat chat) {
		//System.out.println("입력값 chat : " + chat);
		Chat resultChat = new Chat();
		try {
			int result = chatService.addChat(chat);
			//System.out.println("채팅 " + result + "개 추가");
			
			Map map = new HashMap();
			map.put("custId", chat.getCustId());
			map.put("stuId", chat.getStuId());
			resultChat = chatService.getMostRecentChat(map);
			//System.out.println("결과값 resultChat : " + resultChat);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultChat;
	}

	/* 채팅 아이디로 해당되는 채팅을 지움 */
	@ApiOperation(value="채팅 아이디로 해당되는 채팅을 삭제함", response = int.class)
	@DeleteMapping("/chat/delete/{chatId}")
	public ResponseEntity deleteChat(@PathVariable String chatId) {
		try {
			int result = chatService.deleteChat(chatId);
			//System.out.println("채팅 파일 " + result + "개 삭제 완료");
			
			if(result == 1) {
				return new ResponseEntity(1, HttpStatus.OK);
			}else { //해당되는 채팅이 없을 경우
				return new ResponseEntity(-1, HttpStatus.OK);
			}
		}catch(Exception e) {
			//e.printStackTrace();
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}
	
	@ApiOperation(value="채팅 읽음 처리(readCheck=1)")
	@PutMapping("/chat/prev/{stuId}/{custId}/{sender}")
	public ResponseEntity updateReadCheck(@PathVariable String stuId, @PathVariable String custId, @PathVariable String sender) {
		try {
			Map map = new HashMap();
			map.put("stuId", stuId);
			map.put("custId", custId);
			map.put("sender", sender);
			
			/* 대화 목록을 가져가기 전에 읽음 처리를 한다. */
			int result = chatService.setAlreadyRead(map);
			//System.out.println("읽음 처리 : " + result);
			return new ResponseEntity(HttpStatus.OK);
		} catch(Exception e) {
			//e.printStackTrace();
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}
	
	@ApiOperation(value="읽지 않은 채팅 개수를 반환", response = List.class)
	@GetMapping("/chat/unread/{member}/{id}")
	public ResponseEntity getCountOfUnreadChat(@PathVariable String member, @PathVariable String id) {
		System.out.println(member);
		System.out.println(id);
		
		List<Map> list = new ArrayList<>();
		try {
			if(member.equals("com")) {
				list = chatService.getCountOfUnreadComChat(id);
			}else if(member.equals("cust")) {
				list = chatService.getCountOfUnreadCustChat(id);
			}
			System.out.println(list);
			
			if(list.size()>0) {
				return new ResponseEntity(list, HttpStatus.OK);
			}else { //해당되는 대화가 없을 경우
				return new ResponseEntity(-1, HttpStatus.OK);
			}
		} catch(Exception e) {
			//e.printStackTrace();
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}
	
	@ApiOperation(value="스튜디오, 고객의 대화를 모두 반환", response = List.class)
	@GetMapping("/chat/prev/{stuId}/{custId}")
	public ResponseEntity getAllChat(@PathVariable String stuId, @PathVariable String custId) {
		try {
			Map map = new HashMap();
			map.put("stuId", stuId);
			map.put("custId", custId);
			
			List<Chat> list = chatService.getPrevAllChat(map);
			//System.out.println(list);
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
	
	
	@ApiOperation(value="가장 최근 대화 반환", response = List.class)
	@GetMapping("/chat/recent/{member}/{id}")
	public ResponseEntity getRecentChat(@PathVariable String member, @PathVariable String id) {
		List<Map<String, String>> recentChat = new ArrayList<>();
		try {
			if(member.equals("com")) { //기업으로 로그인 했을 경우
				recentChat = chatService.getRecentComChat(id);
				//System.out.println(recentChat);
			}else if(member.equals("comNoRepeat")) { //기업으로 로그인했는데 중복 없이 최근 대화를 가져감
				recentChat = chatService.getRecentComChatNoRpeat(id);
				//System.out.println(recentChat);
			}else if(member.equals("cust")) { //고객으로 로그인 했을 경우
				recentChat = chatService.getRecentCustChat(id);
				//System.out.println(recentChat);
			}else if(member.equals("stu")) { //스튜디오별로 최근 대화를 불러오려고 할 때
				recentChat = chatService.getRecentStuChat(id);
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
	
	@ApiOperation(value="이름으로 대화 검색한 결과 반환", response = List.class)
	@GetMapping("/chat/recent/{member}/{id}/{name}")
	public ResponseEntity getRecentChatByName(@PathVariable String member, @PathVariable String id, @PathVariable String name) {
		List<Map<String, String>> recentChat = new ArrayList<>();
		Map map = new HashMap();
		try {
			/* 고객 이름으로 검색한, 업체의 스튜디오별/고객별 최근 대화  */
			if(member.equals("com")) { //기업으로 로그인 했을 경우
				map.put("comId", id);
				map.put("custName", name);
				recentChat = chatService.getRecentChatByCustName(map);
				//System.out.println(recentChat);
			}
			/* 스튜디오 이름으로 검색한, 고객의 스튜디오별 최근 대화  */
			else if(member.equals("cust")) { //고객으로 로그인 했을 경우
				map.put("custId", id);
				map.put("stuName", name);
				recentChat = chatService.getRecentChatByStuName(map);
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
	
	/* 스튜디오 아이디, 고객 이름으로 검색하면 업체의 최근 대화 가져오기
	 * (com, studio, cust, chat 정보 추출)  */
	@ApiOperation(value="스튜디오 아이디, 고객 이름으로 검색한 뒤 업체의 최근 대화 반환", response = List.class)
	@GetMapping("/chat/recent/com/{comId}/{stuId}/{custName}")
	public ResponseEntity getRecentChatByStuIdAndCustName(@PathVariable String comId, @PathVariable String stuId, @PathVariable String custName) {
		List<Map<String, String>> recentChat = new ArrayList<>();
		Map map = new HashMap();
		try {
			map.put("comId", comId);
			map.put("stuId", stuId);
			map.put("custName", custName);
			recentChat = chatService.getRecentChatByStuIdAndCustName(map);
			//System.out.println(recentChat);
			
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
	@ApiOperation(value="채팅 상대의 기본정보 반환", response = Map.class)
	@GetMapping("/chat/info/{member}/{id}")
	public ResponseEntity getDefaultInfo(@PathVariable String member, @PathVariable String id) {
		Map map = new HashMap();
		try {
			if(member.equals("stu")) { //스튜디오 정보 가져오기
				map = chatService.getStuDefaultInfo(id);
				//System.out.println(map);
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
