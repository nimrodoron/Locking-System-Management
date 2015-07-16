package server.service;

import server.domain.User;

import java.util.Collection;
import java.util.Optional;

public interface UserService {

    Optional<User> getUserById(long id);

    Optional<User> getUserByUsername(String username);

    Collection<User> getAllUsers();

    //User create(UserCreateForm form);

}
