// bring in the database connection
const db = require('./conn');

// declare the class
class Restaurant {
    constructor(id, name, address, street, city, state, phone, menu, picture) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.street = street;
        this.city = city;
        this.state = state;
        this.phone = phone;
        this.menu = menu;
        this.picture = picture;
    }
    // getAll is a static method
    static getAll() {
        // .any returns 0 or more results in an array
        // but that's async, so we 'return' the call to db.any
        return db.any(`select * from restaurants`);
    }

    static getById(id) {
        return db.one(`select * from restaurants where id=${id}`)
            .then((restaurantData) => {
                const restaurantInstance = new Restaurant(restaurantData.id, restaurantData.name, restaurantData.address, restaurantData.street, restaurantData.city, restaurantData.state, restaurantData.phone, restaurantData.menu, restaurantData.picture);
                return restaurantInstance;
            })
            .catch(() => {
                return null;
            });
    }
}

// export the class
module.exports = Restaurant;