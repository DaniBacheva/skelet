const router = require ("express").Router();
const userManager = require('../managers/userManager')

router.get('/register', (req,res)=>{
    res.render('users/register')
});

router.post ('/register', async(req, res) => {
    const { firstName, lastName, email, password, repeatPassword} = req.body;

    await userManager.register({firstName, lastName, email, password, repeatPassword})

    res.redirect('/users/login')

    console.log(req.body)
}
)

router.get('/login', (req,res)=> {
    res.render('users/login')
});

router.post ('/login', (req, res) => {
    const { email, password} = req.body;

    console.log(req.body)
res.redirect('/')

}
)



module.exports=router;