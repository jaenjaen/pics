package com.devils.pics.domain;

public class Tag {
	private int tagId;
	private int stuId;
	private String tagName;
	
	public Tag() {}
	
	public Tag(int tagId, int stuId, String tagName) {
		super();
		this.tagId = tagId;
		this.stuId = stuId;
		this.tagName = tagName;
	}

	public int getTagId() {
		return tagId;
	}

	public void setTagId(int tagId) {
		this.tagId = tagId;
	}

	public int getStuId() {
		return stuId;
	}

	public void setStuId(int stuId) {
		this.stuId = stuId;
	}

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}
	@Override
	public String toString() {
		return "Tag [tagId=" + tagId + ", stuId=" + stuId + ", tagName=" + tagName + "]";
	}
	
}
