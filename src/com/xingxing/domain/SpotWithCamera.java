package com.xingxing.domain;

import java.util.List;

public class SpotWithCamera {

	private int id;
	private String name;
	private String url;
	private double longitude;
	private double latitude;
	private String desc;
	private List<Camera> cameraList;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public List<Camera> getCameraList() {
		return cameraList;
	}
	public void setCameraList(List<Camera> cameraList) {
		this.cameraList = cameraList;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	
}
