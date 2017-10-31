package rest.JSON;

import security.IUser;

/**
 *
 * @author mathiasjepsen
 */
public class JSONUser {
    
    private String username;
    private String passwordHash;
    private String fName;
    private String lName;
    private String phone;
    private String email;

    public JSONUser(IUser user) {
        this.username = user.getUserName();
        this.passwordHash = user.getPasswordHash();
        this.fName = user.getfName();
        this.lName = user.getlName();
        this.phone = user.getPhone();
        this.email = user.getEmail();
    }
    
}
