package server.service;

import org.springframework.data.domain.Sort;
import server.domain.Acp;

import java.util.Collection;

/**
 * Created by nimrodoron on 7/19/15.
 */
public interface AcpService {

    public Collection<Acp> getAllAcps();
}
