package server.service;

import server.domain.CurrentUser;

import java.lang.Long;

public interface CurrentUserService {

    boolean canAccessUser(CurrentUser currentUser, Long userId);

}
