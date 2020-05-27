var mongoose = require('mongoose')
var Schema = mongoose.Schema;

module.exports = mongoose.model('Couple', Schema({
        user1: {
            name: {
                type: String,
                required: true,
                validate: {
                    validator: function(text) {
                        return text.length > 0;
                    },
                    message: "NAME is a required field."
                }
            },
            faveColor: String,
            profilePic: String
        },
        user2: {
            name: {
                type: String,
                required: true,
                validate: {
                    validator: function(text) {
                        return text.length > 0;
                    },
                    message: "NAME is a required field."
                }
            },
            faveColor: String,
            profilePic: String
        },
        timeTogether: Number
}))