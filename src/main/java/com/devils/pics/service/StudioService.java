package com.devils.pics.service;

import java.util.List;

import com.devils.pics.domain.Studio;

public interface StudioService {
	public List<Studio> getStudiosBycomId(String comId) throws Exception;
	public int deleteStudio(int stuId) throws Exception;
}
