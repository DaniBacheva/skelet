init structure and project
setup developer inviorment
install express, nodemon
---------------------
bodyparser config, static config;
foder public, views
-------------------
config router
install express-handlebars
 - config view engine
 -------------------we4e s aktualni failowe
  - add main layout
  -fix public styles ostawa samo /css/site.css
  -render home page in hbs
  ---------------
  -trim all htmls - leave only <main> make them hbs
  -group views in folders
 Add controller folder - home controller
 ----------------
 Add data base
 install mongoose, connetct to DB
User functionality
  - user controller, add it to routes\
 - fix navigation(login register, logout)
 -------------------------
 -render login register+Post
 ------------------------
 Add user Model - validation in schema
 -add method to register - record in DB
 virtual(password, repeatPassword match ?)
 validate email unique???????

 Add hash to password - i bcrypt, hash password
Login - find user(email, ), validate paswword

Generate JWT
install JWT, promisify JWT, generate SECRET
generate token

Install cookis parser - config, set cookie with token
Logout page
Auth middleware- folder middleware, import auth in express config after cookieParser
  decode the token, handle invalid token
   provide authorization

Dynamic navigation - conditinal options in nav
  

  