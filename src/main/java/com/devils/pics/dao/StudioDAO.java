package com.devils.pics.dao;

import java.util.List;
import com.devils.pics.domain.Studio;

public interface StudioDAO {
	public List<Studio> getStudiosBycomId(String comId) throws Exception;
	public int deleteStudio(int stuId) throws Exception;

}
