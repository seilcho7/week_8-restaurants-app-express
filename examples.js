const db = require('./conn');

function getUserById(theId) {
    return db.any(`select * from users where id=${theId}`)
        .then(function(data) {
            console.log(data);
        })
        .catch(function(error) {
            // error;
        });
}

getUserById(3)
    .then(function () {
        getUserById(4);
    })