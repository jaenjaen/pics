package com.devils.pics.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data //getter, setter를 자동생성
@AllArgsConstructor //생성자를 자동 생성
public class Chat {
	private int chatId;
	private int custId;
	private int stuId;
	private String word;
	private String dateTime;	
	private String filePath;
	private int sender;
	private int readCheck;
	
	public Chat() {}
	
	
	public int getChatId() {
		return chatId;
	}
	public void setChatId(int chatId) {
		this.chatId = chatId;
	}
	public int getCustId() {
		return custId;
	}
	public void setCustId(int custId) {
		this.custId = custId;
	}
	public int getStuId() {
		return stuId;
	}
	public void setStuId(int stuId) {
		this.stuId = stuId;
	}
	public String getWord() {
		return word;
	}
	public void setWord(String word) {
		this.word = word;
	}
	public String getDateTime() {
		return dateTime;
	}
	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public int getSender() {
		return sender;
	}
	public void setSender(int sender) {
		this.sender = sender;
	}
	public int getReadCheck() {
		return readCheck;
	}
	public void setReadCheck(int readCheck) {
		this.readCheck = readCheck;
	}
	
	@Override
	public String toString() {
		return "Chat [chatId=" + chatId + ", custId=" + custId + ", stuId=" + stuId + ", word=" + word + ", dateTime="
				+ dateTime + ", filePath=" + filePath + ", sender=" + sender + ", readCheck=" + readCheck + "]";
	}
}
