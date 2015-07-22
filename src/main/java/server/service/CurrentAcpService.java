package server.service;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import server.domain.Acp;
import server.domain.User;

import java.util.Collection;
import java.util.Map;

/**
 * Created by nimrodoron on 7/19/15.
 */
public interface CurrentAcpService {

    void InitAcpMap();

}
