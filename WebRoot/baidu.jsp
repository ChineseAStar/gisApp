<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	
	<style type="text/css">
	body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
	</style>
	<link rel="stylesheet" type="text/css" href="easyui/themes/default/easyui.css"/>
	<link rel="stylesheet" type="text/css" href="easyui/themes/icon.css"/>
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=i4pAYKQPYGMyaPt0ifc6fEDT"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js"></script>	
	<script type="text/javascript" src="easyui/jquery.min.js"></script>
	<script type="text/javascript" src="easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/myfunforbaidu.js"></script>
	<!--加载鼠标绘制工具-->
	<script type="text/javascript" src="js/DrawingManager_min.js"></script>
	<link rel="stylesheet" href="css/DrawingManager_min.css" />
<title>地图展示</title>
</head>
<body>
	<div id="allmap">
			
	</div>
	
	<div id="dlgPoint" class="easyui-dialog" title="点编辑" data-options="iconCls:'icon-point'" style="width:400px;height:200px;padding:10px">
		
	    	<table>
	    		<tr>
	    			<td colspan="4">名称:<input id="name" class="easyui-textbox" type="text" name="name" data-options="required:true"></input></td>
	    		</tr>
	    		<tr>
	    			<td colspan="4">URL:<input id="url" class="easyui-textbox" type="text" name="url" data-options="required:true"></input></td>
	    		</tr>
	    		<tr>
	    			<td colspan="4">描述:<input id="desc" class="easyui-textbox" type="text" name="desc" data-options="required:true"></input></td>
	    		</tr>
	    		<tr>
					<td colspan="4">起角:<input id="angle" class="easyui-textbox" type="text" name="angle" data-options="required:true"></input></td>
				</tr>
	    		<tr >
	    			<td>经度：</td><td id="lng"/>
	    			<td>纬度：</td><td id="lat"/>
	    		</tr>
	    	   <tr >
	    			<td>
	    			   <a href="#" class="easyui-linkbutton" onclick="newSpot()">保存</a>
	    			   <a href="#" class="easyui-linkbutton" onclick=" $('#dlgPoint').dialog('close');">取消</a>
	    			</td>
	    		</tr>
	    	</table>
	  
	</div>
</body>
</html>




