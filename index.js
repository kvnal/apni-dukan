require('dotenv').config()
const express = require('express');
const app = express();

const path = require('path');

const fs = require('fs');

//
const products = require('./mongoDB');

const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => app.listen(3000, () => console.log('Listening :3000...')))
    .catch((err) => console.log('DB error'));


// viewengine
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));
//form middleware
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
res.sendFile(path.join(__dirname,'public','home.html'))

});


app.get('/register', (req, res) => {
    res.send('register');
});

app.get("/verify",(req,res)=>{
    res.sendFile(path.join(__dirname,'public','face.html'))
})
app.get('/payment', (req, res) => {
    res.send('payment');
    products.find().then((result) => console.log(result));
});

app.get('/dashboard', (req, res) => {
    // var fake_data = fs.readFileSync(path.join(__dirname,'data','products.json'),'utf-8')
    // fake_data = JSON.parse(fake_data)
    products.find().then((result) => {
        res.render('dashboard', { data: result });
    });

});

// app.get('/products',(req,res)=>{
// //    res.json({"hello":0})
//    res.sendFile(path.join(__dirname,'data','products.json'))
// }
// )

app.get((req, res) => {
    // 404 page
    res.send("404 not found!!");
    // res.sendFile(path.join(__dirname,'404.html'))
});

app.get('/testdb', (req, res) => {
    const product = new products({
        title: 'test product title',
        description: 'this is test description /testdb',
        price: 200,
        category: 'sports'
    });

    product.save().then((result) => res.send(result))
        .catch((err) => console.log(err));
});


app.post('/products', (req, res) => {
    console.log(req.body);
    const product = new products(req.body);
    product.save().then((result) => res.redirect('/dashboard'))
        .catch((err) => console.log('Mongo ERROR' + err));
});

app.post('/search', (req, res) => {
    console.log(req.body);
    reg = new RegExp(`${req.body.search}`, 'i');
    products.find({ title: reg }, (err, data) => {
        console.log(data);
        res.render('dashboard', { data });
    });
});


app.get('/product/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    products.findById(id).then((result) => {
        console.log(result);
        res.render('product', { data: result });
    })
        .catch((err) => {
            res.sendFile(path.join(__dirname, '404.html'));
        });

});

app.get('/category/:search', (req, res) => {
    const search = req.params.search;
    products.find({ category: search }, (err, data) => {
        console.log(data);
        res.render('dashboard', { data });
    });
});



app.get('/checkout/:cart',(req, res) => {
    const cart = req.params.cart.split(',');
    console.log(cart);
    const data = [];
    var total =0;
    cart.forEach(element => {
        products.findById(element)
            .then((result) => {
                data.push(result);
                total += parseInt(result.price);
                if(data.length == cart.length){
                    res.render("cart",{data,total})
                }
            })
            .catch((err) => console.log("ID cart error " + err));

    })
    //    setTimeout(() => {
    //       console.log(data); 
    //    }, 3000);

});

app.get('/cart', (req, res) => {
    const data = [
        {
            _id: "607151d4c6f76a1248cf1503",
            title: 'title 1',
            price: 3,
            description: 'bn',
            category: 'books',

        },
        {
            _id: "6071556252cf866744bfb69a",
            title: 'title 32',
            price: 233,
            description: 'this isok',
            category: 'electronics',

        }
    ];
    res.render('cart', { data });
});
