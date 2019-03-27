const User = require('./users');

async function main() {
    const theUser = await User.getById(3);
    console.log(theUser);
}

main();