const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Message = new Schema({
    createdBy: String,
    text: String,
    liked: Boolean,
    // createdAt: Date
  })

let Relationships = new Schema({
        user1: {
            name: String,
            color: String,
            favorites: String,
            profilePic: String,

            messages: [Message]

            // messages: [
            //     {
            //       type: mongoose.Schema.Types.ObjectId,
            //       ref: "Message"
            //     }
            // ]

            // messages: [{
            //     message: {
            //         text: String,
            //         liked: Boolean
            //     },
            // }]
            // pictures: [{
            //     picture: {
            //         url: String,
            //         liked: Boolean
            //     },
            // }]
            // links: {
            //     link: { type: [String], index: true, unique: true },
            //     liked: Boolean
            // },
            // reminders: {
            //     reminder: { type: [String], index: true, unique: true },  // consider putting this in a DIFFERENT MODEL or ARRAY
            //     dueDate: Date,
            // }
        },
        user2: {
            name: String,
            color: String,
            favorites: String,
            profilePic: String,
            messages: [Message]
            // messages: [{
            //     message: {
            //         text: String,
            //         liked: Boolean
            //     },
            // }]
            // pictures: [{
            //     picture: {
            //         url: String,
            //         liked: Boolean
            //     },
            // }]
            // add whatever fields you add to User1
        },
        length: {
            type: Number
        },
        together: {
            type: Boolean
        }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

module.exports = mongoose.model('Message', Message)

module.exports = mongoose.model('Relationships', Relationships)



// unique: true WORKS for giving ID -- but it seems like Mongoose gives ID either way
// user1: {
//     name: String,
//     messages: [{
//         message: { type: {
//             text: String,
//             liked: Boolean
//         },
//         unique: true }
//     }],





// users: {
        //     name1: String,
        //     name2: String
        // },
        // sharedContent: {
        //     messages: {
        //         text: { type: [String], index: true },
        //         liked: [Boolean]
        //     },
        //     pictures: { 
        //         picURL: {type: [String], index: true },
        //         liked: [Boolean]
        //     },
        //     links: {
        //         link: { type: [String], index: true },
        //         liked: Boolean
        //     },
        //     events: {
        //         event: { type: [String], index: true }, // consider putting this in a DIFFERENT MODEL or ARRAY
        //         eventDay: Date,
        //         liked: Boolean
        //     },
        //     reminders: {
        //         reminder: { type: [String], index: true },  // consider putting this in a DIFFERENT MODEL or ARRAY
        //         dueDate: Date,
        //     }
        // },