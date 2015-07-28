package server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import server.service.CurrentAcpService;
import server.service.CurrentAcpServiceImpl;

/**
 * Created by nimrodoron on 7/8/15.
 */
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(WebMvcConfig.class, args);

       /* CurrentAcpService cas = new CurrentAcpServiceImpl();
        cas.InitAcpMap();*/

    }
}
