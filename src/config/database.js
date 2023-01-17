const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/VotingSystem1', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,//Loại bỏ warning khi đánh index
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
    
}

module.exports = {connect}