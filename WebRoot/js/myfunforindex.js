var array = new Array();
	//修改关于摄像头的参数
	function submit(){
		var sectoraddAngle = $('#sectoraddAngle').val(); 
		var radius = $('#radius').val(); 
		var sectorAngle = $('#sectorAngle').val(); 
		var opacity = $('#opacity').val(); 
		document.getElementById("mapFrame").contentWindow.edit(sectoraddAngle,radius,sectorAngle,opacity);
	}
	function collapseAll(){
		$('#tt').tree('collapseAll');
	}
	function expandAll(){
		$('#tt').tree('expandAll');
	}
	//快速定位
	function expandTo(){
		var node = $('#tt').tree('find',113);
		$('#tt').tree('expandTo', node.target).tree('select', node.target);
	}
	//得到所有已选地图元素
	function getSelected(){
	    var nodes = $('#tt').tree('getChecked');
	    var tmpArray = new Array();
	    for(var i=0; i<nodes.length; i++){
	    	tmpArray[i] =array[nodes[i].id];
	    }
	    document.getElementById("mapFrame").contentWindow.showSpotAndSector(tmpArray);
	}
	function showAllSpot(){
		var tmpArray = new Array();
		var j = 0;
		for(var i = 0; i < array.length; i++){
			if(array[i] != null){
				tmpArray[j] = array[i];
				j = j + 1;
			}
		}
		document.getElementById("mapFrame").contentWindow.showSpot(tmpArray);
	}
	function showAllSector(){
		var tmpArray = new Array();
		var j = 0;
		for(var i = 0; i < array.length; i++){
			if(array[i] != null){
				tmpArray[j] = array[i];
				j = j + 1;
			}
		}
		document.getElementById("mapFrame").contentWindow.showSector(tmpArray);
	}
	function showFlu(){
		document.getElementById("mapFrame").contentWindow.showPFlu();
	}
	function clearMap(){
		document.getElementById("mapFrame").contentWindow.clearMap();
	}
	function hideDataTab()
	{
		$('#centerLayout').layout('collapse','south');
	}

	$(document).ready(function () {
	 	$("#mapFrame").attr("src", "baidu.jsp");
	 	$.post("search.do");
	 	//加载元素树数据
		$.getJSON("jsondata/tree_data.json",function(treeData){    	  
	 		$.post("search.do",function(data){
	 	 		$(data.features).each(function(index) {
	 	 	 		if(data.features[index].geometry.type=="Point"){
		     	 	 	array[index] = new Object();
		     	 	 	array[index].id=data.features[index].properties.id;
		     	 	 	array[index].name=data.features[index].properties.name;
		     	 	 	array[index].longitude=data.features[index].geometry.coordinates[0];
		     	 	 	array[index].latitude=data.features[index].geometry.coordinates[1];
		     	 	 	array[index].photo=data.features[index].photo;
		     	 	 	array[index].desc = data.features[index].desc || "";
		     	 	 	var cameras = new Array();
	 	 	 	   		$(data.features[index].cameras).each(function(j){
	 	 	 		  		cameras[j] = new Object();
	 	 	 		   		cameras[j].id = data.features[index].cameras[j].id;
	 	 	 		   		cameras[j].angle = data.features[index].cameras[j].angle;
	 	 	 	   		});
	 	 	 	   		array[index].cameras = cameras;
	     	 	 	   	var children = {
						  "id":index,
				          "text":array[index].name
						};
						treeData[0].children[0].children.push(children);			
	 	 	 		}
	 	 	 		$("#tt").tree({data: treeData});
	 	 		});
	 	 	
	 	  	});
	   	});
	});