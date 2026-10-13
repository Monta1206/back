const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },

  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: [true, 'Order must be linked to a physical table']
  },

  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: [true, 'Order item must have a menu item link']
      },

      quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity cannot be less than 1'],
        default: 1
      }
    }
  ],

  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    default: 0
  },

  status: {
    type: String,
    enum: [
      'pending',
      'accepted',
      'preparing',
      'ready',
      'served',
      'cancelled'
    ],
    default: 'pending'
  },

  // Payment information
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  },

  paymentMethod: {
    type: String,
    enum: ['cash'],
    default: 'cash'
  }

}, { timestamps: true });


module.exports = mongoose.model('Order', orderSchema);