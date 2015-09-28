package server.web;

import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by nimrodoron on 7/8/15.
 */
@RestController
public class AcpAdminController {

    @RequestMapping("/addAcp")
    @Secured("ROLE_ADMIN")
    public void addAcp(@RequestParam(value="name") String name) {

    }
}
