package security;

import entity.User;
import java.util.List;
import rest.JSON.JSONUser;

/**
 *
 * @author mathiasjepsen
 */
public interface IAdminFacade {
    
    List<IUser> getUsers();
    void deleteUser(String username);
    JSONUser editUser(User editedUser) throws PasswordStorage.CannotPerformOperationException;
    
}
