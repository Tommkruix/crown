package org.crown.config.dbmigrations;

import com.github.cloudyrock.mongock.ChangeLog;
import com.github.cloudyrock.mongock.ChangeSet;
import org.crown.domain.Authority;
import org.crown.domain.ResourceType;
import org.crown.domain.User;
import org.crown.security.AuthoritiesConstants;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.time.Instant;

/**
 * Creates the initial database setup.
 */
@ChangeLog(order = "001")
public class InitialSetupMigration {

    @ChangeSet(order = "01", author = "initiator", id = "01-addAuthorities")
    public void addAuthorities(MongoTemplate mongoTemplate) {
        Authority adminAuthority = new Authority();
        adminAuthority.setName(AuthoritiesConstants.ADMIN);
        Authority userAuthority = new Authority();
        userAuthority.setName(AuthoritiesConstants.USER);
        mongoTemplate.save(adminAuthority);
        mongoTemplate.save(userAuthority);
    }

    @ChangeSet(order = "02", author = "initiator", id = "02-addUsers")
    public void addUsers(MongoTemplate mongoTemplate) {
        Authority adminAuthority = new Authority();
        adminAuthority.setName(AuthoritiesConstants.ADMIN);
        Authority userAuthority = new Authority();
        userAuthority.setName(AuthoritiesConstants.USER);

        User adminUser = new User();
        adminUser.setId("user-2");
        adminUser.setLogin("admin");
        adminUser.setPassword("$2a$10$Mo3X5MXtsxsL27yBej/E8.6Y37HqhpKvsLYQ74s8GMgX/lWRStnDm");
        adminUser.setFirstName("admin");
        adminUser.setLastName("Administrator");
        adminUser.setEmail("techsupport@needmoremed.com");
        adminUser.setActivated(true);
        adminUser.setLangKey("en");
        adminUser.setCreatedBy(adminUser.getLogin());
        adminUser.setCreatedDate(Instant.now());
        adminUser.getAuthorities().add(adminAuthority);
        adminUser.getAuthorities().add(userAuthority);
        mongoTemplate.save(adminUser);
    }

    @ChangeSet(order = "04", author = "initiator", id = "05-addResourceTypes")
    public void addResourceTypes(MongoTemplate mongoTemplate) {

        String[] resourceTypeNames = new String[]{"Booties","Face shield","Goggles","Gown","Hand sanitizer","Masks (Homemade)","Mask (N95)","Masks (Surgical)","Swabs","Ventilator"};

        for(String resourceTypeName: resourceTypeNames) {
            ResourceType resourceType = new ResourceType();
            resourceType.setName(resourceTypeName);
            mongoTemplate.save(resourceType);
        }

    }

}
