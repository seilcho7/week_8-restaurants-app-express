// const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const User = require('../models/users');
const Restaurant = require('../models/restaurants');
const Review = require('../models/reviews');
const Favorite = require('../models/favorites');

// add a "describe block" for restaurant tests
describe('Restaurant model', () => {
    it('should be able to grab an array of restaurants', async () => {
        // write the code you wish existed
        const arrayOfRestaurants = await Restaurant.getAll();
        expect(arrayOfRestaurants).to.be.instanceOf(Array);
    })
    it('should be able to grab restaurants by id', async () => {
        const restaurant = await Restaurant.getById(2);
        expect(restaurant).to.be.instanceOf(Restaurant);
    });
    it('should error if no restaurant by id', async () => {
        const restaurant = await Restaurant.getById(1234);
        expect(restaurant).to.be.null;
    });
});

// describe('Sanity check', function () {
//     it('should be 2', function () {
//         // assert.equal(2, 1 + 1);
//         expect(1 + 1).to.equal(2);
//     });
// });

describe('Users model', () => {
    // Happy path 😃
    it('should be able to retreive by id', async () => {
        const theUser = await User.getById(3);
        expect(theUser).to.be.instanceOf(User);
        // theUser.should.be.an.instanceOf(User);
        // theUser.should.have.length(1);
    });
    // Sad path 😢
    it('should error if no user by id', async () => {
        const theUser = await User.getById(3242);
        expect(theUser).to.be.null;
        // theUser.should.be.an.instanceOf(User);
        // theUser.should.have.length(1);
    });

    // as long as there is no exception thrown in an it block, that counts as a passing test
    it('should update the user', async () => {
        // grab a user with id 2
        const theUser = await User.getById(2);
        // update the email
        theUser.email = "new@new.com";
        // save the user
        await theUser.save();
        // re-grab the user with id 2
        const alsoTheUser = await User.getById(2);
        // expect the email to be equal to the new value
        expect(alsoTheUser.email).to.equal('new@new.com');
    });

    it('should not have the same email after updating it', async () => {
        // grab a user with id 2
        const theUser = await User.getById(2);
        // grab the current value for the email field
        const theOldEmail = theUser.email;

        // update the email to a new value
        // using the unix timestamp as part of the address
        const theNewEmail = `new${new Date().getTime()}@email.com`;
        theUser.email = theNewEmail;
        
        // save the user to the database
        await theUser.save();
        
        // re-grab the user with id 2
        const alsoTheUser = await User.getById(2);
        
        // expect the email not to be equal to the new value;
        expect(alsoTheUser.email).not.to.be.equal(theOldEmail);
        expect(alsoTheUser.email).to.be.equal(theNewEmail);


        // theUser.save()
        //     .then(async (report) => {
        //         // console.log(report);
        //         // re-grab the user with id 2
        //         const alsoTheUser = await User.getById(2);
        //         // expect the email to be equal to the new value
        //         expect(alsoTheUser.email).to.equal('new3asdfadf@new.com');
        //     });
    }); 

    it('should encrypt the password', async () => {
        const password = "bacon";
        // get a user with id 1
        const theUser = await User.getById(1);
        // set their password field to "bacon"
        theUser.setPassword("bacon");
        //compare their password to "bacon"
        expect(theUser.password).not.to.equal(password);
        // it should be false
    });

    it('should be able to check for correct passwords', async () => {
        // get a user with id 1
        const theUser = await User.getById(2);
        // set their password field to "bacon"
        theUser.setPassword("g3t570n3d");
        // save them to the database
        await theUser.save();
        // get them back out of the database
        const sameUser = await User.getById(2);
        // ask them if their password is "bacon"
        const isCorrectPassword = sameUser.checkPassword('g3t570n3d');
        expect(isCorrectPassword).to.be.true;

        const isNotCorrectPassword = sameUser.checkPassword('tofu');
        expect(isNotCorrectPassword).to.be.false;
    });
});

describe('Reviews model', () => {
    // Can I get one review?
    it('should be able to retrieve a review by id', async () => {
        // hopes and dreams
        const thatReview = await Review.getById(2);
        expect(thatReview).to.be.instanceOf(Review);
    });
    // Can I get all reviews?
    it('should be able to retrieve all reviews', async () => {
        const aBunchOfReviews = await Review.getAll();
        expect(aBunchOfReviews).to.be.an.instanceOf(Array);
        // and make sure each of them is an array
        // Use a plain for loop, so that the exception does not
        // get swallowed by a .forEach callback
        for (let i = 0; i < aBunchOfReviews.length; i++) {
            expect(aBunchOfReviews[i]).to.be.an.instanceOf(Review);
        }
    });
});

describe('Users and Reviews', () => {
    it('a user instance should be able to retrieve all their reviews', async () => {
        // grab a user by id 3
        const theUser = await User.getById(3);
        // then get all their reviews
        // const theReviews = await theUser.getReviews();
        const theReviews = await theUser.reviews;
        // confirm that their reviews are in an array
        expect(theReviews).to.be.instanceOf(Array);
        // and that the array is the correct length, which should be 4
        expect(theReviews).to.be.lengthOf(4);
        // and that each one is an instance of Review
        for (let i = 0; i < theReviews.length; i++) {
            expect(theReviews[i]).to.be.instanceOf(Review);
        }
    });
});

describe('Users and Favorites', () => {
    it('should be able to retrieve all favorites for a user', async () => {
        // grab a user by id 1
        const theUser = await User.getById(1)
            .then((user) => {
                console.log(user);
                return user;
            });
        // // then get all their favorites
        const theFavorites = await theUser.favorites()
            .then((favorite) => {
                console.log(favorite);
                return favorite;
            });
        // confirm that the favorites are in an array
        expect(theFavorites).to.be.instanceOf(Array);
    });
});