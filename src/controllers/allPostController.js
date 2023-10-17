const router = require("express").Router();
const creatureManager = require('../managers/creatureManager')

router.get('/', async  (req,res) => {
    const creatures = await creatureManager.getAll().lean();
    console.log({creatures})
    res.render('posts/all', {creatures});
});

router.get('/create', (req,res)=> {
    res.render("posts/create")
});

router.get("/profile", (req,res) => {
    res.render("posts/profile")
});

router.post("/create", async (req,res)=> {
   const { 
    name,
    species,
    skinColor,
    eyeColor,
    image,
    description  } = req.body;

    const payload = { name, species, skinColor, eyeColor, image, description , owner: req.user };

    await creatureManager.create(payload);

    console.log(req.body)
     res.redirect ('/posts/')
})

module.exports = router;