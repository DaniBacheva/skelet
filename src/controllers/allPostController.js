const router = require("express").Router();

router.get('/', (req,res) => {
    res.render('posts/all-posts')
});

module.exports = router;