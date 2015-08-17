package server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

import static reactor.bus.selector.Selectors.$;

/**
 * Created by nimrodoron on 7/8/15.
 */
@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan
@EnableScheduling
public class Application {

    public static void main(String[] args) throws InterruptedException {

        SpringApplication.run(Application.class);
    }
}


