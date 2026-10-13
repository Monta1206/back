const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
  },

  description: {
    type: String,
    required: [true, 'Description is required'],
  },

  price: {
    type: Number,
    required: [true, 'Price is required'],
  },

  image: {
    type: String,
    required: [true, 'Food image is required'],
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },

  available: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });


module.exports = mongoose.model('MenuItem', menuItemSchema);