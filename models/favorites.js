const db = require('./conn');

class Favorite {
    constructor(id, user_id, restaurant_id) {
        this.id = id,
        this.userId = user_id,
        this.restaurantId = restaurant_id
    }

    static favorites(id) {
        return db.any(`select res.name from restaurants res inner join favorites fav on res.id = fav.restaurant_id where fav.user_id=${id}`)
            .then((userFavorite) => {
                console.log(userFavorite);
                return userFavorite;
            });
    }
}

module.exports = Favorite;