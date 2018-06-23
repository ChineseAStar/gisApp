package com.xingxing.jsonmanager;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.xingxing.domain.Camera;
import com.xingxing.domain.SpotWithCamera;

public class SpotAllPJMan {

	public JSONObject getJSON(List<SpotWithCamera> spotWithCameraList) {
		JSONObject js = new JSONObject();
		try {
			js.put("type", "FeatureCollection");
			
			JSONObject crs = new JSONObject();
			crs.put("type", "name");
			
			JSONObject properties = new JSONObject();
			properties.put("name", "urn:ogc:def:crs:OGC:1.3:CRS84");
			crs.put("properties", properties);
			
			js.put("crs", crs);
			
			JSONArray array = new JSONArray();
			
			for(SpotWithCamera spot : spotWithCameraList) {
				addS(array, spot);
			}
			
			js.put("features", array);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return js;
	}
	
public static void addS(JSONArray array, SpotWithCamera spot) throws JSONException {
		
		//创建对象
		JSONObject tmp = new JSONObject();
		
		//类型信息注入
		tmp.put("type", "Feature");
		
		//点信息
		JSONObject properties = new JSONObject();
		properties.put("id", spot.getId());
		properties.put("name", spot.getName());
		properties.put("type", "scu");
		
		tmp.put("properties", properties);
		
		//spot类型和经纬度
		JSONObject geometry = new JSONObject();
		geometry.put("type", "Point");
		geometry.put("coordinates", new double[] {spot.getLongitude(), spot.getLatitude()});
		
		tmp.put("geometry", geometry);
		
		//cameras信息注入
		JSONArray cameraArray = new JSONArray();
		for(Camera camera : spot.getCameraList()) {
			addC(cameraArray, camera);
		}
		
		//cameras填入
		tmp.put("cameras", cameraArray);
		
		//照片地址填入
		tmp.put("photo", spot.getUrl());
		
		//描述信息填入
		tmp.put("desc", spot.getDesc());
		
		//spot对象填入
		array.put(tmp);
	}
	
	public static void addC(JSONArray array, Camera camera) throws JSONException {
		
		//camera的信息
		JSONObject cameraJ = new JSONObject();
		cameraJ.put("angle", camera.getAngle());
		cameraJ.put("id", camera.getId());
		
		//加入集合
		array.put(cameraJ);
	}
	
}
