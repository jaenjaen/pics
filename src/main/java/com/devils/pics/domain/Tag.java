package com.devils.pics.domain;

public class Tag {
	private int tagId;
	private int stuId;
	private String tag;
	
	public Tag() {}

	public Tag(int tagId, int stuId, String tag) {
		this.tagId = tagId;
		this.stuId = stuId;
		this.tag = tag;
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

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}
	@Override
	public String toString() {
		return "Tag [tagId=" + tagId + ", stuId=" + stuId + ", tag=" + tag + "]";
	}
	
}
