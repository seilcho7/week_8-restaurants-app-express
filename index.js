// Bring in the express library.
const express = require('express');
// Create a new express app.
const app = express();

// let counter = 0;

function log(req, res, next) {
    console.log(`They asked for ${req.url}`);
    // counter += 1;
    // req.counter = counter;
    next();
}

function checkForUser(req, res, next) {
    // Pretend that we're checking for a real logged in user.
    // For now, just add one to the req.
    // req.user = {
    //     username: 'Cascading Style Seils'
    // };

    const isLoggedIn = false;
    if (isLoggedIn) {
        req.user = {
            username: 'Cascading Style Seils'
        };
        next();
    } else {
        // I do not want to go to the 'next' middleware
        // I want to redirect them to the login page.
        // Behind the scenes, tell the browser to make an additional request,
        // but for a different URL.
        res.redirect('/login');
    }
    // req.user = null;
    // next();
}

function homePage(req, res) {
    if (req.user) {
        res.send(`Hey ${req.user.username}! Hooray!.`);
    } else {
        res.send("Wait, I don't know you.");
    }
}


// const http = require('http');
const querystring = require('querystring');

// const hostname = '127.0.0.1';
const port = 3000;

// For POST
app.use(express.urlencoded({extended: true}));

// Import my model class
const Restaurant = require('./models/restaurants');
const User = require('./models/users');

app.get('/', log, checkForUser, homePage);

function loginPage(req, res) {
    res.send('You must log in!');
}

app.get('/login', loginPage);

app.get('/restaurants', async (req, res) => {
    const allRestaurants = await Restaurant.getAll();
    // const restaurantJSON = JSON.stringify(AllRestaurants);
    // res.json will do 2 things:
    // 1. It converts your JS Object or Array to a JSON string
    // 2. It puts the correct Content-Type header on the response 
    res.json(allRestaurants);
});

app.get('/users', async (req, res) => {
    const allUsers = await User.getAll();
    res.json(allUsers);
});
app.get('/users/:id', async (req, res) => {
    // How to grab a piece out of req.params (or any object):
    // const id = req.params.id;
    // This is known as "destructuring"
    const {id} = req.params;
    const theUser = await User.getById(id);
    res.json(theUser);
});

app.post('/users', async (req, res) => {
    console.log(req.body);
    res.json(req.body);
    await User.add(req.body);
});

app.put('/users/:id', async (req, res) => {
    console.log(req.body);
    await User.update(req.params.id, req.body);
    res.end(`{ "id": ${req.params.id}}`); 
});

app.delete('/users/:id', async (req, res) => {
    await User.delete(req.params.id);
    res.end(`{ "id": deleted user id ${req.params.id}}`);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
