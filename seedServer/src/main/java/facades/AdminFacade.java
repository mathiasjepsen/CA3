package facades;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import security.IAdminFacade;

/**
 *
 * @author mathiasjepsen
 */
public class AdminFacade implements IAdminFacade {

    EntityManagerFactory emf;

    public AdminFacade(EntityManagerFactory emf) {
        this.emf = emf;
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
    
}
