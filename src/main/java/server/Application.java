package server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.handler.PerConnectionWebSocketHandler;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;
import server.domain.CurrentAcpInfo;
import server.handler.CurrentAcpHandler;

import static reactor.bus.selector.Selectors.$;

/**
 * Created by nimrodoron on 7/8/15.
 */
@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan
//@EnableScheduling
@EnableWebSocket
public class Application extends SpringBootServletInitializer
        implements WebSocketConfigurer {

    public static void main(String[] args) throws InterruptedException {

        SpringApplication.run(Application.class);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(currentAcpInfoWebSocketHandler(), "/CurrentAcpInfo").withSockJS();
    }

    @Bean
    public WebSocketHandler currentAcpInfoWebSocketHandler() {
        return new PerConnectionWebSocketHandler(CurrentAcpHandler.class);
    }

    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }


}


