const db = require('./conn');

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

// 3
function getAverageReview(theId) {
    return db.any(`select res.name, avg(rev.score), count(f.user_id) from restaurants res inner join reviews rev on res.id = rev.restaurant_id inner join favorites f on f.restaurant_id = res.id where res.id=${theId}`)
}
getAverageReview(1).then(console.log);
