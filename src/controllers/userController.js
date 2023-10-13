const router = require ("express").Router();

router.get('/register', (req,res)=>{
    res.render('users/register')
});

router.post ('/register', (req, res) => {
    const { firstNAme, lastName, email, password, repeatPassword} = req.body;

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