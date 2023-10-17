const router = require("express").Router();

router.get('/', (req,res) => {
    res.render('posts/all-posts')
});

router.get('/create', (req,res)=> {
    res.render("posts/create")
});

router.get("/profile", (req,res) => {
    res.render("posts/profile")
});

module.exports = router;