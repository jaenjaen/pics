package com.devils.pics.domain;

public class Tag {
	private int tagDicId;
	private String tagName;
	
	public Tag() {}
	
	public Tag(int tagDicId, String tagName) {
		this.tagDicId = tagDicId;
		this.tagName = tagName;
	}

	public int getTagDicId() {
		return tagDicId;
	}

	public void setTagDicId(int tagDicId) {
		this.tagDicId = tagDicId;
	}

	public String getTagName() {
		return tagName;
	}
	
	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

	@Override
	public String toString() {
		return "Tag [tagDicId=" + tagDicId + ", tagName=" + tagName + "]";
	}
	
}
