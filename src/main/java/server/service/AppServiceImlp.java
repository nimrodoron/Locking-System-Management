package server.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import server.domain.Acp;
import server.repository.AcpRepository;
import server.repository.UserRepository;

import java.util.Collection;

/**
 * Created by nimrodoron on 7/19/15.
 */
@Service
public class AppServiceImlp implements AcpService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
    private final AcpRepository acpRepository;

    @Autowired
    public AppServiceImlp(AcpRepository acpRepository) {
        this.acpRepository = acpRepository;
    }


    @Override
    public Collection<Acp> getAllAcps() {
        LOGGER.debug("Getting all users");
        return acpRepository.findAll();
    }
}
