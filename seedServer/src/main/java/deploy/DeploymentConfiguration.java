package deploy;

import entity.Role;
import entity.User;
import facades.UserFacade;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Properties;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
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
 

//  UserFacade uf = new UserFacade(Persistence.createEntityManagerFactory("pu_development"));
//
//        EntityManager em = Persistence.createEntityManagerFactory("pu_development").createEntityManager();
//        try {
//            em.getTransaction().begin();
//            Address address = new Address("London", "2000", "first avenue", "124312");
//            Address address2 = new Address("Paris", "3000", "second avenue", "42142");
//            Address address3 = new Address("Copenhagen", "4000", "third avenue", "12412");
//            User user1 = new User("mathias", "1234", "Mathias", "Jepsen", "123325234", "mathias@wpsnet.com");
//            User user2 = new User("thomas", "1234", "Thomas", "Thimothee", "23442635", "thomas@thom.com");
//            User user3 = new User("Dimitri", "1234", "Dim", "Dimitri", "456789", "dim@dim.com");
//            User admin = new User("admin", "1234");
//            Role role = new Role("User");
//            Role adminRole = new Role("Admin");
//            user1.addRole(role);
//            user2.addRole(role);
//            user3.addRole(role);
//            admin.addRole(adminRole);
//            HashMap<String, Double> rating = new HashMap();
//            rating.put(user1.getUserName(), 2.0);
//            rating.put(user2.getUserName(), 3.0);
//            rating.put(user3.getUserName(), 4.0);
//            List<String> images = new ArrayList();
//            images.add("fwafwaw");
//            Place place = new Place(address, "hfhw", rating, images);
//            HashMap<String, Double> rating2 = new HashMap();
//            rating2.put(user1.getUserName(), 20.0);
//            rating2.put(user2.getUserName(), 25.0);
//            rating2.put(user3.getUserName(), 28.0);
//            List<String> images2 = new ArrayList();
//            images2.add("fwafwaw");
//            Place place2 = new Place(address2, "hfhw", rating2, images2);
//            HashMap<String, Double> rating3 = new HashMap();
//            rating3.put(user1.getUserName(), 10.0);
//            rating3.put(user2.getUserName(), 8.0);
//            rating3.put(user3.getUserName(), 6.0);
//            List<String> images3 = new ArrayList();
//            images3.add("fwafwaw");
//            Place place3 = new Place(address3, "hfhw", rating3, images3);
//            em.persist(address);
//            em.persist(address2);
//            em.persist(address3);
//            em.persist(place);
//            em.persist(place2);
//            em.persist(place3);
//            em.persist(user1);
//            em.persist(user2);
//            em.persist(user3);
//            em.persist(admin);
//            em.persist(role);
//            em.persist(adminRole);
//            em.getTransaction().commit();
//        } catch (PasswordStorage.CannotPerformOperationException ex) {
//            Logger.getLogger(DeploymentConfiguration.class.getName()).log(Level.SEVERE, null, ex);
//        } finally {
//            em.close();
//        }
        
  }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {

    }
}
