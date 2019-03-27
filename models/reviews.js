const db = require('./conn');
const Restaurant = require('./restaurants');

class Review {
    constructor (id, score, content, restaurant_id, user_id) {
        this.id = id;
        this.score = score;
        this.content = content;
        this.restaurantId = restaurant_id;
        this.userId = user_id;
    }

    static getAll(id) {
        return db.any(`select rev.score, rev.content from reviews rev inner join restaurants res on res.id = rev.restaurant_id where res.id=${id}`)
            .then((result) => {
                console.log(result);
            })
    }

    static getLatest(howMany=10) {
        // grab 10 latest, for any restaurants
    }

    restaurant() {
        // get the restaurant instance for this review
        // and turn it into an instance of Restaurant
    }

    // convenience methods for formatting
    summary() {
        return this.content.substring(0, 200);
    }


}

Review.getAll(2);

module.exports = Review;