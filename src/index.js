const express = require ('express');
const path = require  ('path');
const handlebars = require("express-handlebars")
const routes = require('./router')

const PORT = 5050;
//app init
const app = express();

//express config
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded({ extended: false}));

//handlebars congig
app.engine("hbs", handlebars.engine({ extname : "hbs"}));
app.set("view engine", "hbs");
app.set("views", "src/views");


//routes
app.get("/", (req,res)=> {
    //res.send("hi")
   res.render("home")
});

app.use(routes)

app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}...`));
