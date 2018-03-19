package ssk.server.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "/ssk")
public class SSKLaunchController {
	
	@RequestMapping("/")
	@ResponseBody
	String home() {
		return "SSK Running!";
	}
}
