package com.devils.pics.domain;

public class Chat {
	private int chatId;
	private int custId;
	private String word;
	private String dateTime;
	private int stuId;
	private int sender;

	public Chat(int chatId, int custId, String word, String dateTime, int stuId, int sender) {
		this.chatId = chatId;
		this.custId = custId;
		this.word = word;
		this.dateTime = dateTime;
		this.stuId = stuId;
		this.sender = sender;
	}
	
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
	public int getStuId() {
		return stuId;
	}
	public void setStuId(int stuId) {
		this.stuId = stuId;
	}
	public int getSender() {
		return sender;
	}
	public void setSender(int sender) {
		this.sender = sender;
	}
	@Override
	public String toString() {
		return "Chat [chatId=" + chatId + ", custId=" + custId + ", word=" + word + ", dateTime=" + dateTime
				+ ", stuId=" + stuId + ", sender=" + sender + "]";
	}
}
