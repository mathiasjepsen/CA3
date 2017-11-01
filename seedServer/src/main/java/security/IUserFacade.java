package security;

import entity.Place;
import entity.Role;
import entity.User;
import java.util.List;

/**
 *
 * @author lam
 */
public interface IUserFacade {

    /*
    Return the Roles if users could be authenticated, otherwise null
     */
    List<String> authenticateUser(String userName, String password);
    IUser getUserByUserId(String id);
    IUser registerUser(User user, Role role) throws PasswordStorage.CannotPerformOperationException;
    IUser registerAdmin(User admin, Role role) throws PasswordStorage.CannotPerformOperationException;
    List<Place> getAllPlaces();
    
}
