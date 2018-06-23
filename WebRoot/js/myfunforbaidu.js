var map;
	var centerPointer;

	///////////////////////////////////////////////摄像头生成区
	var markers = [];
	//扇形生成
	function Sector1(point, radius, sDegree, eDegree, strokeColour, strokeWeight, Strokepacity, fillColour, fillOpacity, opts) {
		var points = [];  
	    var splice = 2;
	    points.push(point);
	    for ( var i = sDegree; i < eDegree + 0.001; i += splice) {
		    points.push(EOffsetBearing(point, radius, i));  
	    }
	    points.push(point);
	    var polygon = new BMap.Polygon(  
	      points  
	    , {strokeColor:strokeColour, strokeWeight:strokeWeight, strokeOpacity:Strokepacity, fillColor: fillColour, fillOpacity:fillOpacity});     
	    return polygon;  
	}  

	//扇形切割
	function EOffsetBearing(point3, dist, bearing) {  
	    var latConv = map.getDistance(point3, new BMap.Point(point3.lng + 1, point3.lat));  
	    var lngConv = map.getDistance(point3, new BMap.Point(point3.lng, point3.lat + 1));  
	    var lat = dist * Math.cos(bearing * Math.PI / 180) / latConv;  
	    var lng = dist * Math.sin(bearing * Math.PI / 180) / lngConv;
	    return new BMap.Point(point3.lng + lng, point3.lat + lat);
	}
	var people_data = new Array();
	var heatmapOverlay;
	function showPFlu(){
		map.addOverlay(heatmapOverlay);
		heatmapOverlay.setDataSet({data:people_data,max:100});
	}

	// 摄像头参数调整
	var sectorAngle = 105;			//每个扇形30度
	var sectoraddAngle = 0;			//起始角度调整
	var radius = 25;				//摄像头统一半径
	var opacity = 0.8;				//不透明度
	var sectorColour = "blue";	//颜色（定死）
	var strokeWeight = 3;			//边界（定死）
	function edit(sectoraddAngle,radius,sectorAngle,opacity){
		this.sectoraddAngle = Number(sectoraddAngle) || 0;
		this.radius = Number(radius) || 25;
		this.sectorAngle = Number(sectorAngle) || 105;
		this.opacity = Number(opacity) || 0.8;
		alert("起始角度调整值:" + this.sectoraddAngle+'\n'+
				"扇形半径值:" + this.radius+'\n'+
				"扇形角度值:" + this.sectorAngle+'\n'+
				"透明度:" + this.opacity);
	}
	//绘制摄像头
	function paintSector(centerPointer,startAngles){
		for(var i = 0; i < startAngles.length; i++){
			var startAngle = this.sectoraddAngle + startAngles[i].angle;
			var polygon1 = Sector1(centerPointer, this.radius, startAngle, 
					this.sectorAngle + startAngle, this.sectorColor, this.strokeWeight,
					this.opacity, this.sectorColor, this.opacity);
			map.addOverlay(polygon1);
		}
	}
	
	//清理地图
	function clearMap(){
		map.clearOverlays(); 
	}
	//以点的形式标出位置
	function showSpot(array){
		var myIcon = new BMap.Icon("photo/camera.gif",
				new BMap.Size(50,50));
		for(var i = 0; i < array.length; i++){
			var point = new BMap.Point(array[i].longitude, array[i].latitude);
			var marker = new BMap.Marker(point,{icon:myIcon});
			map.addOverlay(marker);
			informationLoad(marker,designinfoWindow(array[i]));
		}
	}
	//显示扇形
	function showSector(array){
		for(var i = 0; i < array.length; i++){
			var point = new BMap.Point(array[i].longitude, array[i].latitude);
			paintSector(point,array[i].cameras);
		}
	}
	//扇形和点都显示
	function showSpotAndSector(array){
		clearMap();
		showSpot(array);
		showSector(array);
	}
	//保存新点的函数
	function newSpot(){
		var name = $('#name').val();
		var url = $('#url').val();
		var latitude = $('#lat').text();
		var longitude = $('#lng').text();
		var desc = $('#desc').val();
		var angle = $('#angle').val();
		$('#dlgPoint').dialog('close');
		alert("name:" + name+'\n'+
				"url:" + url+'\n'+
				"lat:" + latitude+'\n'+
				"lng:" + longitude+'\n'+
				"desc:" + desc+'\n'+
				"angle:" + angle);
	}

	function designinfoWindow(point){
		var content = "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>"+point.name+"</h4>" + 
		"<img style='float:right;margin:4px' id='imgDemo' src='"+point.photo+"' width='139' height='104' title='"+point.name+"'/>" + 
		"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>"+
		point.desc+"</p>" + 
		"</div>";
		return content;
	}

	//信息窗口加载
	function informationLoad(marker,content){
		var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
		marker.addEventListener("click", function(){          
			this.openInfoWindow(infoWindow);
		    //图片加载完毕重绘infowindow
		    document.getElementById('imgDemo').onload = function (){
			    infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
		    }
		});
	}
		/////////////////////初始加载区域//////////////////////
		$().ready(function() {
			//--------------------------------- 百度地图加载开始---------------------
			map = new BMap.Map("allmap");    // 创建Map实例
			map.centerAndZoom(new BMap.Point(121.538, 38.876), 16);  // 初始化地图,设置中心点坐标和地图级别
			map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
			map.setCurrentCity("大连");          // 设置地图显示的城市 此项是必须设置的
			map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
			//--------------------------------地图工具配置 开始--------------------------
			$.getJSON("jsondata/people_data.json",function(peopleData){
				people_data=peopleData.data;
				heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":peopleData.radius});
			});
			
		    var overlaycomplete = function(e){
				if (e.drawingMode == BMAP_DRAWING_MARKER) {
					strPoints ="经度："+ e.overlay.getPosition().lng + " 纬度："+e.overlay.getPosition().lat;
					$('#lng').html(e.overlay.getPosition().lng); 
					$('#lat').html(e.overlay.getPosition().lat); 
					$('#dlgPoint').dialog('open');   	
				}
			};
					
		    var styleOptions = {
		        strokeColor:"red",    //边线颜色。
		        fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
		        strokeWeight: 3,       //边线的宽度，以像素为单位。
		        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
		        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
		        strokeStyle: 'solid' //边线的样式，solid或dashed。
		    }
		    //实例化鼠标绘制工具
		    var drawingManager = new BMapLib.DrawingManager(map, {
		        isOpen: true, //是否开启绘制模式
		        enableDrawingTool: true, //是否显示工具栏
		        drawingToolOptions: {
		            offset: new BMap.Size(5, 5), //偏离值
		        },
		        circleOptions: styleOptions, //圆的样式
		        polylineOptions: styleOptions, //线的样式
		        polygonOptions: styleOptions, //多边形的样式
		        rectangleOptions: styleOptions //矩形的样式
		    });  
			 //添加鼠标绘制工具监听事件，用于获取绘制结果
		    drawingManager.addEventListener('overlaycomplete', overlaycomplete);
		    $('#dlgPoint').dialog('close');
		    
		    function clearMap() {
				for(var i = 0; i < overlays.length; i++){
		            map.removeOverlay(overlays[i]);
		        }
		        overlays.length = 0;
		    }
			map.addEventListener("mousemove", function(e) {
		        $('#currentLatLng',parent.document).html("鼠标当前位置:"+e.point.lng+";"+ e.point.lat); 
		    });
		});