package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.domain.Acp;
import server.domain.User;

import java.util.List;
import java.util.Optional;

/**
 * Created by nimrodoron on 7/19/15.
 */
public interface AcpRepository extends JpaRepository<Acp, Long> {

    //public List<Acp> getAllAcps();
}
