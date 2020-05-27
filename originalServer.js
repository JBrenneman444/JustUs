const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);
const relationshipRoutes = express.Router();
const PORT = 3000;

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}))

// ====================================================
// required MODELS
let Relationships = require('./relationships.model')
// let Couple = require('./Couple.model')
let Message = require('./Message.model')

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/relationships',{useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect('mongodb://127.0.0.1:27017/relationships', (err) => {
//     if(!err)
//         console.log("Server has been connected to mongodb");
// });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("mongoDB db connection set up successfully")
    })

relationshipRoutes.route('/').get(function(req, res) {
    Relationships.find(function(err, relationship) {
        if (err) {
            console.log(err);
        } else {
            res.json(relationship)
        }
    })
})

relationshipRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Relationships.findById(id, function(err, relationship) {
        res.json(relationship)
    })
})

relationshipRoutes.route('/add').post(function(req, res) {
    let relationship = new Relationships(req.body);
    relationship.save()
    .then(relationship => {
        res.status(200).json({'relationship': 'relationship added successfully'})
    })
    .catch(err => {
        res.status(400).send('adding new relationship failed')
    })
})

// following bezkoder.com TUTORIAL on One to Many Rel's for MONGOOSE
const createMessage = function(relationshipId, message) {
    return db.Message.create(message).then(docMessage => {
      console.log("\n>> Created Message:\n", docMessage);
  
      return db.Relationships.findByIdAndUpdate(
        relationshipId,
        { $push: { messages: docMessage._id } },
        { new: true, useFindAndModify: false }
      );
    });
  };
// 

relationshipRoutes.route('/update/:id').post(function(req, res) {
    Relationships.findById(req.params.id, function(err, relationship) {
        if (!relationship)
            res.status(404).send('data is not found');
        else
            
            relationship.user1.name = req.body.user1.name;
            relationship.user1.color = req.body.user1.color;
            relationship.user1.favorites = req.body.user1.favorites;
            relationship.user1.profilePic = req.body.user1.profilePic;
            // relationship.user1.messages[0].message.text = req.body.user1.messages[0].message.text

            relationship.user2.name = req.body.user2.name;
            relationship.user2.color = req.body.user2.color;
            relationship.user2.favorites = req.body.user2.favorites;
            relationship.user2.profilePic = req.body.user2.profilePic;
            // relationship.user2.messages.message.text.liked

            relationship.length = req.body.length;
            relationship.together = req.body.together;

            relationship.save().then(relationship => {
                res.json('Relationship updated')
            })
            .catch(err => {
                res.status(400).send('update not possible')
            })
    })
})

relationshipRoutes.route('/:id').delete(function(req,res) {
    Relationships.findByIdAndRemove(req.params.id, function(err, deletedRelationship) {
        if (!deletedRelationship)
            res.status(404).send('data not found to delete');
        else
            res.status(200).json(deletedRelationship)
            // console.log(deletedRelationship.user1 + " and " + deletedRelationship.user2 + " were deleted")
    })
})

app.use('/relationships', relationshipRoutes)

app.listen(PORT, function() {
    console.log('server is running on port:', PORT)
})