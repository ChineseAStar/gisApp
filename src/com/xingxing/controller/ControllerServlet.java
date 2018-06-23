package com.xingxing.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.xingxing.service.SpotService;

@Controller
public class ControllerServlet{

	@RequestMapping("/search.do")
	private String searchAll(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Content-type", "application/json");
		PrintWriter pw = response.getWriter();
		String tmp = new SpotService().test().toString();
		pw.print(tmp);
		return null;
	}
}

