const db = require('./conn');

class Favorite {
    constructor(id, user_id, restaurant_id) {
        this.id = id,
        this.userId = user_id,
        this.restaurantId = restaurant_id
    }
}

module.exports = Favorite;