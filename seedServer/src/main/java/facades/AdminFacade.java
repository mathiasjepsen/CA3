package facades;

import entity.User;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import rest.JSON.JSONUser;
import security.IAdminFacade;
import security.IUser;
import security.PasswordStorage;

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

    @Override
    public List<IUser> getUsers() {
        EntityManager em = getEntityManager();
        try {
            Query q = em.createQuery("SELECT u FROM USER u JOIN u.roles r WHERE r.roleName = 'User'");
            List<IUser> users = q.getResultList();
            return users;
        } finally {
            em.close();
        }
    }

    @Override
    public void deleteUser(String username) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            em.remove(em.find(User.class, username));
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    @Override
    public JSONUser editUser(User editedUser) throws PasswordStorage.CannotPerformOperationException {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            User oldUser = em.find(User.class, editedUser.getUserName());
            oldUser.createPasswordHash(editedUser.getPasswordHash());
            oldUser.setfName(editedUser.getfName());
            oldUser.setlName(editedUser.getlName());
            oldUser.setEmail(editedUser.getEmail());
            oldUser.setPhone(editedUser.getPhone());
            oldUser.setRoles(editedUser.getRoles());
            em.getTransaction().commit();
            JSONUser newUser = new JSONUser(oldUser);
            return newUser;
        } finally {
            em.close();
        }
    }

}
