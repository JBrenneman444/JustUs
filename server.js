require('dotenv').config() // PPL addition
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors')
var mongoose = require('mongoose');
const path = require("path")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "client", "build")))

// required MODELS
var Message = require('./Message.model');
var Couple = require('./Couple.model');

app.use(cors());

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/couples',{ // PPL addition
    useNewUrlParser: true,
    useUnifiedTopology: true}, (err) => {
    if(!err)
        console.log("Server connected to MongoDB!");
});

// Error / success --- PPL addition
mongoose.connection.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
mongoose.connection.on('connected', () => console.log('mongo connection path: ', process.env.MONGODB_URI)); // HEROKU
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
mongoose.connection.once('open' , ()=>{ // might need to change to "ON" instead of "ONCE"
    console.log("Mongo CONNECTED!");
});

app.get("/messages/seed", express.json({type: '*/*'}), (req, res) => {
    Message.create(
      [
        {
            createdBy: "Jake",
            text: "check this out",
            tag: "message"
        },
        {
            createdBy: "Jake",
            text: "LINK",
            tag: "message"
        },
        {
            createdBy: "Delya",
            text: "GIF",
            tag: "pic"
        },
        {
            createdBy: "Delya",
            text: "that was pretty lame. why am I dating you again?",
            tag: "message"
        },
        {
            createdBy: "Jake",
            text: "wasnt it for my charming with or something?",
            tag: "message"
        },
        {
            createdBy: "Delya",
            text: "youve really got to stop mistaking your mom's compliments with things i've never said",
            tag: "message"
        },
        {
            createdBy: "Jake",
            text: "GIF",
            tag: "pic"
        },
        {
            createdBy: "Delya",
            text: "😂",
            tag: "message"
        },
        {
            createdBy: "Jake",
            text: "ay whats the name of that dispensary again",
            tag: "message"
        },
        {
            createdBy: "Delya",
            text: "Electric Lettuce? 🍁",
            tag: "message"
        },
        {
            createdBy: "Jake",
            text: "thats the one - thanks boo 😙",
            tag: "message"
        }
      ],
      (error, data) => {
        console.log(data);
        // res.redirect("/messages");
        if(error)
            res.status(400).send("Error while seeding")
        else
            res.status(200).json(data);
      }
    );
  });

// ============================================ this works!
// CREATE route for COUPLE
app.post('/couples', express.json({type: '*/*'}), (req,res) => {
    console.log('adding new couple');
    // var coupleObj = {
    //     "_id": new mongoose.Types.ObjectId(),
    //     "name": req.body.name,
    //     "faveColor": req.body.faveColor,
    //     "profilePic": req.body.profilePic
    // }
    var newCouple = new Couple(req.body);
    newCouple.save((err,couple)=> {
        if(err)
            res.status(400).send("Error while adding new couple")
        else
            res.status(200).json(couple);
    })
})

// ============================================ this works!
// CREATE route for MESSAGE
app.post('/messages', express.json({type: '*/*'}), (req, res) => {
    console.log('Adding new Message');
    // var messageObj = {
    //     "_id": new mongoose.Types.ObjectId(),
    //     "text": req.body.text,
    //     "couple": "5ec9bd3bf51c7d308415b604" // <---- HARD CODED / CHANGE THIS to be CURRENT USER
    // }
    var newMessage = new Message(req.body);
    newMessage.save((err,message)=> {
        if(err)
            res.status(400).send("Error while adding new message")
        else
            res.status(200).json(message);
    })
})

// ============================================ this works!
// SHOW all Couples
app.get('/couples', (req,res) => {
    console.log('Getting all couples');
    Couple.find({}).populate('message').exec((err,couples) => {
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(couples[0]);
    })
})

// ============================================ this works!
// SHOW all Messages
app.get('/messages', (req,res) => {
    console.log('Getting all messages');
    Message.find({}).populate('couple').exec((err,messages) => {
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(messages);
    })
})

// ============================================ this works!
// UPDATE for Couple
app.put('/couples/:id', express.json({type: '*/*'}), (req,res) => {
    console.log("EDITING a Couple's information");
    // var coupleObj = {
    //     "name1": req.body.name1,
    //     "name2": req.body.name2,
    //     "faveColor": req.body.faveColor,
    //     "profilePic": req.body.profilePic
    // }
    Couple.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec((err,couples) => {
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(couples);
    })
})

// ============================================ this works!
// UPDATE for Messages
app.put('/messages/:id', express.json({type: '*/*'}), (req,res) => {
    console.log("UPDATING a Message");
    Message.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec((err,message) => {
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(message);
    })
})

// ============================================ this works!
// GET one couple's info
app.get('/couples/:id', (req,res) => {
    console.log("getting ONE couple's information");
    Couple.findById(req.params.id, (err,couple) => {
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(couple);
    })
})

// ============================================ this works!
// GET one message's info
app.get('/messages/:id', (req,res) => {
    console.log("getting ONE message's information");
    Message.findById(req.params.id, (err,message) => {
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(message);
    })
})


// ============================================ this works!
// DELETE one Couples info
app.delete('/couples/:id', (req,res) => {
    console.log('Deleting couple');
    Couple.findByIdAndDelete(req.params.id).exec((err, couple) => {
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(couple);
    }
)})

// ============================================ this works!
// DELETE one Message
app.delete('/messages/:id', (req,res) => {
    console.log('Deleting message');
    Message.findByIdAndDelete(req.params.id).exec((err, message) => {
        if(err)
            res.status(400).send(err);
        else
            res.status(200).json(message);
    }
)})

// THIS v WORKS for RUNNING LOCALLY!
app.get('/', (req,res) => {
    res.send('Home page');
})

// Right before your app.listen, add this - so EXPRES can serve REACT FILES
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT, () => { // PPL addition / change
    console.log('App running on PORT', PORT);
})