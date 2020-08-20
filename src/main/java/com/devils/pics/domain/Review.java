package com.devils.pics.domain;

public class Review {
	private int reviewId;
	private Customer customer;
	private Studio studio;
	private int score;
	private String content;
	private String img;
	private String regDate;
	private String answer;

	public Review() {}
	public Review(int reviewId, Customer customer, Studio studio, int score, String content, String img, String regDate,
			String answer) {
		this.reviewId = reviewId;
		this.customer = customer;
		this.studio = studio;
		this.score = score;
		this.content = content;
		this.img = img;
		this.regDate = regDate;
		this.answer = answer;
	}
	public int getReviewId() {
		return reviewId;
	}
	public void setReviewId(int reviewId) {
		this.reviewId = reviewId;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public Studio getStudio() {
		return studio;
	}
	public void setStudio(Studio studio) {
		this.studio = studio;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	@Override
	public String toString() {
		return "Review [reviewId=" + reviewId + ", customer=" + customer + ", studio=" + studio + ", score=" + score
				+ ", content=" + content + ", img=" + img + ", regDate=" + regDate + ", answer=" + answer + "]";
	}

}
