const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const allPostController = require('./controllers/allPostController');

router.use(homeController);
router.use("/users", userController);
router.use("/posts", allPostController);

router.get("*", (req,res)=> {
    res.redirect("/404");
});


module.exports = router;
