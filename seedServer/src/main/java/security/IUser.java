package security;

import entity.Role;
import java.util.List;

public interface IUser {

    List<String> getRolesAsStrings();

    void addRole(Role role);

    String getUserName();

    String getPasswordHash();

    String getfName();

    String getlName();

    String getPhone();

    String getEmail();

    void createPasswordHash(String password) throws PasswordStorage.CannotPerformOperationException;
}
