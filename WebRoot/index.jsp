<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>校园摄像头</title>
	<link rel="stylesheet" type="text/css" href="easyui/themes/default/easyui.css"/>
	<link rel="stylesheet" type="text/css" href="easyui/themes/icon.css"/>
	<link rel="stylesheet" type="text/css" href="easyui/demo/demo.css"/>
	<link rel="stylesheet" type="text/css" href="css/demo.css"/>
	<script type="text/javascript" src="easyui/jquery.min.js"></script>
	<script type="text/javascript" src="easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/myfunforindex.js"></script>
</head>
<body class="easyui-layout">
	<div id="header"  class="header" data-options="region:'north',border:false" >
      	  <h1> 大 连 海 事 大 学 监 控 探 头 分 布 地 图</h1> 
    </div>
         
    <div id="footer"  class="footer" data-options="region:'south',border:false" >
          <table>
         	 <tr>
         	 <td id="currentLatLng"></td>
         	 </tr>
          </table> 
    </div>
  
<div id="left"  class="left"  data-options="region:'west',split:true">
		 <div id="funTab" class="easyui-tabs" >
	 		<div id="function"  class="function"  title="功能" >
	 			<a href="javascript:showAllSpot()" class="easyui-linkbutton" data-options="iconCls:'icon-large-picture',size:'large',iconAlign:'top'">探头显示</a>
				<p>
				<a href="javascript:showAllSector()" class="easyui-linkbutton" data-options="iconCls:'icon-large-clipart',size:'large',iconAlign:'top'">覆盖范围</a>
				<p>
				<a href="javascript:showFlu()" class="easyui-linkbutton" data-options="iconCls:'icon-large-shapes',size:'large',iconAlign:'top'">人流显示</a>
				<p>
<!-- 路线规划未定				<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-large-smartart',size:'large',iconAlign:'top'">安全路径</a>
				<p>-->
				<a href="javascript:clearMap()" class="easyui-linkbutton" data-options="iconCls:'icon-large-chart',size:'large',iconAlign:'top'">清空地图</a>
	 		</div>
	 		<div id="element"  class="element" title="元素" >
				<a href="javascript:collapseAll()" class="easyui-linkbutton">收起</a>
				<a href="javascript:expandAll()" class="easyui-linkbutton" >展开</a>
				<a href="javascript:getSelected()" class="easyui-linkbutton">显示</a>
	 			<ul id="tt" class="easyui-tree" data-options="method:'get',animate:true,checkbox:true"></ul>
	 		</div>
	 	</div>
	</div>
	
	<div  id="right"  class="right" data-options="region:'center'" >
	     <div id="centerLayout" class="easyui-layout" data-options="fit:true">
			 <div  id="rightup"  class="rightup"  data-options="region:'center',border:true,title:'地图'">
			      <iframe id="mapFrame" class="mapFrame"  scrolling="false" frameborder="0"  src="/baidu.jsp"></iframe>
			 </div>
	         <div  id="rightdown"  class="rightdown" data-options="region:'south',split:true,border:true" style="height:240px">
	         	 <div id="dataTab" class="easyui-tabs" data-options="fit:true,border:false,plain:true,tools:'#tab-tools'">
	         	     <div title="摄像数据" >
	         	     <table>
		         	     	<tr>
		         	     		<td>起始角度调整：</td>
		         	     		<td><input id="sectoraddAngle" type="text" value="0"/></td>
		         	     	</tr>
		         	     	<tr>
		         	     		<td>扇形角度调整：</td>
		         	     		<td><input id="sectorAngle" type="text" value="105"/></td>
		         	     	</tr>
		         	     	<tr>
		         	     		<td>扇形半径调整：</td>
		         	     		<td><input id="radius" type="text" value="25"/></td>
		         	     	</tr>
		         	     	<tr>
		         	     		<td>透明度调整：</td>
		         	     		<td><input id="opacity" type="text" value="0.8"/></td>
		         	     	</tr>
	         	     	</table>
	         	     	<input type="button" onclick="submit()" value="保存"/>
	         	     </div>
	         	     <!-- <div title="导航数据" ></div>
	         	     <div title="专题数据" ></div>-->
	         	</div>
	         </div>
	    </div>
	 </div>	
	
	   <div id="tab-tools">
			<a href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'" onclick="hideDataTab()"></a>
		</div>
</body>
</html>