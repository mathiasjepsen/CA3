package deploy;

import entity.Address;
import entity.Role;
import entity.User;
import facades.UserFacade;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
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
                User user = uf.register("lovro", "test", "lovro", "lovrovro", "32423432", "oinoin");
                Role userRole = new Role("user");
                uf.addUserRole(user.getUserName(), userRole);
            } catch (PasswordStorage.CannotPerformOperationException ex) {
                Logger.getLogger(DeploymentConfiguration.class.getName()).log(Level.SEVERE, null, ex);
            } 
        
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {

    }
}
