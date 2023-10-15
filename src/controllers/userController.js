const router = require("express").Router();
const userManager = require('../managers/userManager');
const { extractErrorMsgs } = require('../util/errorHandler');

router.get('/register', (req, res) => {
    res.render('users/register')
});

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, repeatPassword } = req.body;

   try {
        await userManager.register({ firstName, lastName, email, password, repeatPassword });
        res.redirect('/users/login');
   }
    catch (error) {
      const errorMessages = extractErrorMsgs(error);
        console.log(error)
    res.status(404).render("users/register", { errorMessages });
   }
});

router.get('/login', (req, res) => {
    res.render('users/login')
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userManager.login(email, password);
        console.log(token)
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    }
    catch (error) {
        const errorMessages = extractErrorMsgs(error);
        console.log({ errorMessages })
        res.status(404).render("users/login", { errorMessages });
    }
});

router.get('/logout', (req, res) => {

    res.clearCookie('token');
    res.redirect('/');
})

module.exports = router;