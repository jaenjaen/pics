package com.devils.pics.domain;

public class Tag {
	private int tagDicId;
	private String tag;
	
	public Tag() {}
	public Tag(int tagDicId, String tag) {
		this.tagDicId = tagDicId;
		this.tag = tag;
	}
	public int getTagDicId() {
		return tagDicId;
	}
	public void setTagDicId(int tagDicId) {
		this.tagDicId = tagDicId;
	}
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	@Override
	public String toString() {
		return "Tag [tagDicId=" + tagDicId + ", tag=" + tag + "]";
	}
}
