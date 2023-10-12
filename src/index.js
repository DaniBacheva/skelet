const express = require ('express');
const path = require  ('path');

const PORT = 5050;

const app = express();

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded({ extended: false}));

app.get('/', (req,res)=> {
    res.send('hello')
});

app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}...`));
