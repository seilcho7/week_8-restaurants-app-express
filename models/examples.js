const db = require('./conn');

function getUserById(theId) {
    return db.any(`select * from users where id=${theId}`)
}

// async functions can use the keyword "await"
async function main() {
    // Async + await
    const user3 = await getUserById(3);
    // "await" waits for promises it's like an implicit ".then"
    console.log(user3);

    // // Promises
    // getUserById(3)
    //     .then(function (user3) {
    //         console.log(user3);
    //     })        
}
// // main();

// main2 does not have to be async
function main2() {
    const idArray = [1, 2, 3, 4];
    idArray.forEach(async function (id) {
        const user = await getUserById(id);
        return console.log(user);
    });
    // .map runs faster than the 'await', so I get back an array of promises
    // const emailArray = idArray.map(async function (id) {
    //     const user = await getUserById(id);
    //     return user.email;
    // });
    // console.log(emailArray);
}
main2();

async function main3() {
    const idArray = [1, 2, 3, 4];
    const userArray = [];
    idArray.forEach(async function (id) {
        const user = await getUserById(id);
        userArray.push(user);
    });
    console.log(userArray);
    return userArray;
}
// const theUsers = main3();
// console.log(theUsers);


function main4() {
    const idArray = [1, 2, 3, 4];
    const userPromiseArray = idArray.map(function (id) {
        return getUserById(id);
    });
    return Promise.all(userPromiseArray);
}

// main4()
//     .then(function (userArray) {
//         console.log(userArray);
//     })


async function main5() {
    const user3 = await getUserById(3);
    const user4 = await getUserById(4);

    console.log(user3);
    console.log(user4);
}
// main5();





// // user profile
// // 1a
// function getUserByIdPublic(theId) {
//     return db.any(`select id, first_name, last_name, email from users where id=${theId}`)
// }
// getUserByIdPublic(1).then(console.log);

// // 1b
// function getUserByIdPrivate(theId) {
//     return db.any(`select * from users where id=${theId}`)
//         // .then(function(data) {
//         //     console.log(data);
//         // })
//         // .catch(function(error) {
//         //     // error;
//         // });
// }
// getUserByIdPrivate(1).then(console.log);
// // getUserById(3)
// //     .then(function (aUser) {
// //         console.log(aUser)
// //         getUserById(4)
// //             .then(function (bUser) {
// //                 console.log(bUser);
// //             })
//     // })

// // 2
// function getUserFavs(theId) {
//     return db.any(`select u.id as restaurant_id, f.user_id, r.name from users u inner join favorites f on u.id = f.user_id inner join restaurants r on r.id = f.restaurant_id where u.id=${theId}`)
// }
// getUserFavs(1).then(console.log);

// // 3
// function getUserReview(theId) {
//     return db.any(`select r.score, r.content, u.first_name || ' ' || u.last_name as name from users u inner join reviews r on u.id = r.user_id where u.id=${theId}`)
// }
// getUserReview(1).then(console.log);


// restaurant profile

// // 1
// function getInfoRestaurant(theId) {
//     return db.any(`select * from restaurants where id=${theId}`)
// }
// getInfoRestaurant(1).then(console.log);

// // 2
// function getReviewRestaurant(theId) {
//     return db.any(`select * from reviews inner join restaurants r on r.id = reviews.restaurant_id where r.id=${theId}`)
// }
// getReviewRestaurant(1).then(console.log);

// // 3
// function getAverageReview(theId) {
//     return db.any(`select res.name, avg(rev.score), count(f.user_id) from restaurants res inner join reviews rev on res.id = rev.restaurant_id inner join favorites f on f.restaurant_id = res.id where res.id=${theId}`)
// }
// getAverageReview(1).then(console.log);
