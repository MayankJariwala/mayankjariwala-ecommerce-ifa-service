# E-Commerce Services

```
NOTE: Because of timeline there is no specific naming conventions and design patterns followed.
```

#### Local Command: 
```yarn start-local```

### Prerequisite tools:
1. yarn package manager
2. node
3. nodemon
4. Heroku CLI
5. Download heroku accounts plugin  (CMD: heroku plugins:install heroku-accounts)

### Tech Stack, Database , Cache and Image services

1. Node.js
2. Mongodb
4. Node Cache

### Run Scripts locally
    "start": "nodemon ./bin/www",
    "start-local": "export NODE_ENV=local; nodemon ./bin/www",

### Environment files
    - .env.local

### Heroku Deployments

**In order to allow heroku to use different env files, update the environment variable of NODE_ENV or 
add NODE_ENV in config from Heroku dashboard**


**To add accounts:**
```
heroku accounts:add <account_name>
Enter your Heroku credentials.
Email: a@b.c
Password: ******
```

**To switch to a different account:**
```
heroku accounts:set <account_name>
```

**Heroku Accounts:**
    
    - test (API KEY: 41946450-2298-4db8-8300-3771374077d2)
    
**Heroku Git Origin :**
    
    - heroku-test (cmd: git push heroku-test master)

    
Pre-Production Environment:

    - URL: <<URL>>
    - Email: <<EMAIL>>
    - Password: Ask Product Owner


### Deploy to heroku server using bash script
``` cd deployments && ./service.sh << prod|test|preprod >> <<current_branch>>```

- Merge or push to **release/app** branch in order to run pipeline and deploying to production
