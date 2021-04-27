![CI logo](https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png)

Welcome nhidayahj,

This is the Code Institute student template for Gitpod. We have preinstalled all of the tools you need to get started. You can safely delete this README.md file, or change it for your own project. Please do read it at least once, though! It contains some important information about Gitpod and the extensions we use.

## Gitpod Reminders

To run a frontend (HTML, CSS, Javascript only) application in Gitpod, in the terminal, type:

`python3 -m http.server`

A blue button should appear to click: *Make Public*,

Another blue button should appear to click: *Open Browser*.

To run a backend Python file, type `python3 app.py`, if your Python file is named `app.py` of course.

A blue button should appear to click: *Make Public*,

Another blue button should appear to click: *Open Browser*.

In Gitpod you have superuser security privileges by default. Therefore you do not need to use the `sudo` (superuser do) command in the bash terminal in any of the lessons.

In Express, to run the application
1. in terminal ```npm install -g nodemon```
2. then once finished, type in ```nodemon index.js``` 
3. If Gitpod workspace stopped, you have the run Step 1 again. 

***OR*** 
use ```node index.js``` where index.js contains your ```app.use``` code


### Dependencies added 
- yarn add express
- yarn add hbs
- yarn add wax-on
- yarn add dotenv
- yarn add db-migrate
- yarn add knex
- yarn add bookshelf (JS ORM)
- yarn add forms 
- yarn add express-session
- yarn add connect-flash

**nodejs form helper**
- caolan forms used in this lesson

#### In JS:
yarn: called the dependency manager

#### In Python:
-pip 


#### PNP 
- composer 

In actual production, DO NOT use a root user 

## Deployment of Express to Heroku
*This project uses MySQl as database* so steps is slighly different

1. In terminal command, download and install Heroku 
```npm install -g heroku```

2. After installing, log in to your Heroku account 
```heroku login -i```

3. Create Heroku App (Name must be unique and must not have underscores) 
 ```heroku create <app-name>```

4. Create ***Procfile with capital P, with no extension and must be in same root directory as index.js***

Inside Procfile, include this line: 
```web: node index.js```

Add a *'start' script* to ***package.json file***
```
 {
 "name": "06-api-auth",
 "version": "1.0.0",
 "description": "",
 "main": "index.js",
 "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
     "start": "node index.js"
 },
 . . .
 }
 ```
 
5. In index.js, change the current port number in app.listen from 3000 to process.env.PORT

*Save all files and Push all the changes made to Heroku*

Ensure .gitignore has node_modules, .env, sessions/ included in it.
```
git add . 
git commt -m "<message>"
git push heroku master 
```

In this deployment step, database used is  MySQL. However, we need to create an external database, hosted on external server such as Postgres or ClearDB. We will be using Postgres here instead.
In terminal: 
```heroku addons:create heroku-postgresql```

6. Once completed, go to your Heroku account and open the newly created application. In settings, go to ***"Reveal Config"***
There should be a ***DATABASE_URL*** setting

7. Copy and paste the ***DATABASE_URL*** setting on a Notepad (will be needing this info)

8. Make another copy of .env file in Notepad (this is the original copy)

7.i Copy pasted ***DATABASE_URL*** has the following infomation:
-``The syntax is postgres://<user>:<password>/@<host>/<database_name>?reconnect = true"``

```
Example:
postgres://b80f8d428xxxxx:f48exxxx@us-cdbr-iron-east-02.cleardb.net/heroku_58632fb6debxxxx?reconnect=true
# host will be: us-cdbr-iron-east-02.cleardb.net

# user will be: B80f8d428xxxxx

# password will be: F48exxxx

# database_name will be: heroku_58632fb6debxxxx
In your .env file, change the settings of DB_DRIVER to postgres Update .env file to the following now: (Copy from your DB URL)
DB_HOST:us-cdbr-iron-east-02.cleardb.net
DB_USER:B80f8d428xxxxx
DB_NAME:heroku_58632fb6debxxxx
DB_PASSWORD:F48exxxx
```

9. In *database.json*  ensure it has all of these:
```
{
    "dev": {
        "driver": {"ENV" :"DB_DRIVER"},
        "user": {"ENV": "DB_USER" },
        "password": {"ENV":"DB_PASSWORD"},
        "database": {"ENV":"DB_DATABASE"},
        "host": {"ENV":"DB_HOST"},
        "ssl": {
            "rejectUnauthorized": false
        }
    }
}
```


10. In *bookshelf/index.js*, include these changes:
```
const knex = require('knex')({
    'client': process.env.DB_DRIVER,
    'connection': {
        'user': process.env.DB_USER,
        'password': process.env.DB_PASSWORD,
        'database': process.env.DB_DATABASE,
        'host':process.env.DB_HOST,
        'ssl': {
            'rejectUnauthorized': false
        }
    }
})
```

***NOTE***: Since we have changed database from MySQL to Postgres, the new database is clean and does not have any tables. Your original data are still on your local host, you can view them back by changing the DB settings to MySQL, (or retrieve from your original copy saved in Notepad)

11. Save all files. And in terminal: 
```./db-migrate.sh up```

12. Back in Heroku, in ***"Config Variables"*** , ensure all the .env settings are also included here.

13. Save all files, and do commit push to Heroku since changes has been made to our code
```
git add . 
git commit -m <commit messages>
git push heroku master
```
13.i Also try to push to your GitHub (so that Heroku's pushes & your repository is aligned)
```
git add . 
git commit -m <commit messages>
git push
```

14. Since our Postgres is empty, download a community version of [DBeaver](https://dbeaver.io/) and install in computer.

After downloading and launching DB-Beaver.

From the pop up window, select Postgres It will then request to download some necessary files. Allow the operation. In the window that shows up next, fill in the Postgres database you obtained in step 12. Once finished, click on the Finish button. The new connection will appear on the left hand side window. Double click on it. You will be able to see all your tables once you collapse the schemas then publics folder:

Go to ***Stripe***, and add in a new endpoint for https:<your heroku url>/checkout/process_payment, and *replace the old endpoint secret with the new one in your Heroku settings.*

