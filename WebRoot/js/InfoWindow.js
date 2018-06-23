
InfoWindow = {};

//用户信息
InfoWindow.viewUser = 	function(EntityId){
    InfoWindow.open(globalConfig.webPath + "/user/viewUser.action?EntityID=" + EntityId, 690, 520);
};

InfoWindow.open = function(url, width, height, title, option){


	if(window.parent && window.parent.openIFrameWindow)
	{
		if(!title)
			title = "编辑窗口";
		window.parent.openIFrameWindow(url, width, height,  title);
		return;
	}

    newoption = "width = "+width+",height="+height+",left="+(window.screen.width-width)/2+",location=no,top="+(window.screen.height-height)/2 ;
	if (option!=null || option != "")
	{
		newoption += ","+option;                                                                     
	}               
	window.open(url, "", newoption);

}

