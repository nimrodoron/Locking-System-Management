/*package server.web;

import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

*//**
 * Created by nimrodoron on 7/8/15.
 *//*
@RestController
public class AdminController {

    public AdminController()
    {}

    @RequestMapping("/service")
    @Secured("ROLE_ADMIN")
    public String greeting(@RequestParam(value="name") String name) {

        if (name.equals("Shiri") || name.equals("Irad") || name.equals("Nimrod"))
            return "Hi "+name+"!"+"\n"+"Good to have you on the team!";
        return "Unknown name";
    }
}*/
