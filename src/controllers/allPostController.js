const router = require("express").Router();
const creatureManager = require('../managers/creatureManager')

router.get('/', async (req, res) => {
    const creatures = await creatureManager.getAll().lean();
    console.log({ creatures })
    res.render('posts/all', { creatures });
});

router.get('/create', (req, res) => {
    res.render("posts/create")
});

router.get("/profile", async (req, res) => {
const {user} = req;
console.log(user);

const myCreatures = await creatureManager.getMyCreatures(user?._id).lean();
console.log({myCreatures})

    res.render("posts/profile", {myCreatures})
});

router.post("/create", async (req, res) => {
    const {
        name,
        species,
        skinColor,
        eyeColor,
        image,
        description } = req.body;

    const payload = { name, species, skinColor, eyeColor, image, description, owner: req.user };

    await creatureManager.create(payload);

    console.log(req.body)
    res.redirect('/posts/')
});

router.get('/:creatureId/details', async (req, res) => {

    const creatureId = req.params.creatureId;
    const creature = await creatureManager.getSingleCreature(creatureId).lean();
    const { user } = req;
    const { owner } = creature;
    const isOwner = user?._id===owner.toString();
    const alreadyVoted = creature.votes?.some((v)=>v?.toString()===user?._id);

        console.log({ creature });
    res.render(`posts/details`, { creature, isOwner, alreadyVoted })
});

router.get('/:creatureId/edit', async (req,res) => {
    const {creatureId} = req.params;
    const creature = await creatureManager.getSingleCreature(creatureId).lean();

    res.render('posts/edit', { creature})

});

router.post('/:creatureId/edit', async (req,res)=> {
    const {creatureId} = req.params;
    const {
        name,
        species,
        skinColor,
        eyeColor,
        image,
        description } = req.body;

    const payload = { name, species, skinColor, eyeColor, image, description, owner: req.user };
    await creatureManager.update(creatureId, payload);
    res.redirect(`/posts/${creatureId}/details`)
})


router.get('/:creatureId/delete',async  (req,res)=> {
    const {creatureId} = req.params;
    await creatureManager.delete(creatureId);

    res.redirect('/posts/')
});


router.get('/:creatureId/vote',async (req,res)=> {
    const {creatureId} = req.params;
    const {_id } = req.user;

    const creature = await creatureManager.addVotes(creatureId, _id);
    
    res.redirect(`/posts/${creatureId}/details`)
}
)

module.exports = router;