package facades;

import entity.Role;
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
            System.out.println("USers in query: " + users.toString());
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
    
    public IUser addUser(User user) throws PasswordStorage.CannotPerformOperationException {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            String role = user.getRolesAsStrings().get(0);
            switch (role) {
                case "A":
                    role = "Admin";
                    break;
                case "U":
                    role = "User";
                    break;
            }
            Role existingRole = em.find(Role.class, role);
            user.createPasswordHash(user.getPasswordHash());
            user.addRole(existingRole);
            existingRole.addUser(user);
            em.persist(user);
            em.getTransaction().commit();
            return user;
        } finally {
            em.close();
        }
    }
}


