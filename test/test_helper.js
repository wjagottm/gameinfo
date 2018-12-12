const mongoose = require('mongoose');

beforeEach(done => {
    const { users, developers, games, characters } = mongoose.connection.collections;

    users.drop(() => {
        developers.drop(() => {
            games.drop(() => {
                characters.drop(() => {
                    done();
                })
            })
        })
    })
})