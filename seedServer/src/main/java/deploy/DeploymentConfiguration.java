package deploy;

import entity.Role;
import entity.User;
import facades.AdminFacade;
import facades.UserFacade;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.Persistence;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import security.IUser;
import security.PasswordStorage;
import security.Secret;

@WebListener
public class DeploymentConfiguration implements ServletContextListener {

    public static String PU_NAME = "PU-Local";

    @Override
    @SuppressWarnings("empty-statement")
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("######################################################################################");
        System.out.println("############################ In ContextIntialized ####################################");
        System.out.println("######################################################################################");

        //Handling init-params from the properties file (secrets that should not be pushed to GIT)
        InputStream input = null;
        Properties prop = new Properties();
        try {
            input = getClass().getClassLoader().getResourceAsStream("/config.properties");;
            if (input == null) {
                System.out.println("Could not load init-properties");
                return;
            }
            prop.load(input);
            Secret.SHARED_SECRET = prop.getProperty("tokenSecret").getBytes();
            input.close();

        } catch (IOException ex) {
            Logger.getLogger(DeploymentConfiguration.class.getName()).log(Level.SEVERE, null, ex);
        }
        ServletContext context = sce.getServletContext();

            UserFacade uf = new UserFacade(Persistence.createEntityManagerFactory("pu_development"));
                        
            try {
                
                IUser unregisteredUser = new User("lovro", "test", "lovro", "lovrovro", "32423432", "oinoin");
                IUser unregisteredAdmin = new User("admin", "1234");
                Role userRole = new Role("User");
                Role adminRole = new Role("Admin");
                unregisteredUser.addRole(userRole);
                unregisteredAdmin.addRole(adminRole);
                IUser user = uf.registerUser(unregisteredUser, userRole);
                IUser admin = uf.registerAdmin(unregisteredAdmin, adminRole);                
                
            } catch (PasswordStorage.CannotPerformOperationException ex) {
                Logger.getLogger(DeploymentConfiguration.class.getName()).log(Level.SEVERE, null, ex);
            } 
        
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {

    }
}
