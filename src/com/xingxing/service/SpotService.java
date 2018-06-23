package com.xingxing.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.json.JSONObject;

import com.xingxing.common.MySessionFactory;
import com.xingxing.domain.SpotWithCamera;
import com.xingxing.jsonmanager.SpotAllPJMan;

public class SpotService {

	public JSONObject test() {

		SqlSession session = MySessionFactory.getSession();
		List<SpotWithCamera> spotWithCameraList = session.selectList("com.xingxing.mapper.SpotMapper.getAllSpotWithCamera");
		
		return new SpotAllPJMan().getJSON(spotWithCameraList);
		
	}
	
}
