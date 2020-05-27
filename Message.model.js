const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Message',Schema({
      createdBy: {
        type: String,
        default: "Jake"
      },
      liked: {
        type: Boolean,
        default: false
      },
      text: String,
      tag: String,
      couple: {
        default: "5ec9bd3bf51c7d308415b604", // HARD coded -- CHANGE THIS!
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Couple'
      }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
))