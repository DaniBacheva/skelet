const router = require("express").Router();
const creatureManager = require('../managers/creatureManager');
const { isAuth } = require('../middleware/authMiddleware');
const { extractErrorMsgs } = require('../util/errorHandler');

router.get('/', async (req, res) => {
    const creatures = await creatureManager.getAll().lean();
    console.log({ creatures })
    res.render('posts/all', { creatures });
});

router.get('/create', (req, res) => {
    res.render("posts/create")
});

router.get("/profile", isAuth, async (req, res) => {
    const { user } = req;
    console.log(user);

    const myCreatures = await creatureManager.getMyCreatures(user?._id).lean();
    //console.log({myCreatures})

    res.render("posts/profile", { myCreatures })
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

    try {
        await creatureManager.create(payload);

        console.log(req.body)
        res.redirect('/posts/');
    }
    catch (error) {
        const errorMessages = extractErrorMsgs(error);
        console.log(error)
        res.status(404).render("posts/create", { errorMessages });
    }
});

router.get('/:creatureId/details', async (req, res) => {

    const creatureId = req.params.creatureId;
    const creature = await creatureManager.getSingleCreature(creatureId).lean();

    const { user } = req;
    const { owner } = creature;
    const isOwner = user?._id === owner.toString();
    const alreadyVoted = creature.votes?.some((v) => v?._id.toString() === user?._id);
    const emailVoted = creature.votes.map(v => v.email).join(', ')

    console.log({ creature });
    res.render(`posts/details`, { creature, isOwner, alreadyVoted, emailVoted })
});

router.get('/:creatureId/edit', async (req, res) => {
    const { creatureId } = req.params;
    const creature = await creatureManager.getSingleCreature(creatureId).lean();

    res.render('posts/edit', { creature })

});

router.post('/:creatureId/edit', async (req, res) => {
    const { creatureId } = req.params;
    const {
        name,
        species,
        skinColor,
        eyeColor,
        image,
        description } = req.body;

    const payload = { name, species, skinColor, eyeColor, image, description, owner: req.user };

    try {
        await creatureManager.update(creatureId, payload);
        res.redirect(`/posts/${creatureId}/details`);
    }
    catch (error) {
        const errorMessages = extractErrorMsgs(error);
        console.log(error)
        res.status(404).render("posts//:creatureId/edit", { errorMessages });
    }
})


router.get('/:creatureId/delete', async (req, res) => {
    const { creatureId } = req.params;
    await creatureManager.delete(creatureId);

    res.redirect('/posts/')
});


router.get('/:creatureId/vote', async (req, res) => {
    const { creatureId } = req.params;
    const { _id } = req.user;

    const creature = await creatureManager.addVotes(creatureId, _id);

    res.redirect(`/posts/${creatureId}/details`)
}
)

module.exports = router;