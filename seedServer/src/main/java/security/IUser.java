package security;

import java.util.List;

public interface IUser {

    List<String> getRolesAsStrings();

    String getUserName();

    String getPasswordHash();

    String getfName();

    String getlName();

    String getPhone();

    String getEmail();
    
    void createPasswordHash(String password) throws PasswordStorage.CannotPerformOperationException;
}
