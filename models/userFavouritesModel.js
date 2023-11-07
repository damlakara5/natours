const mongoose = require('mongoose');

const userFavoritesSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Favorite must belong to a tour.'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Favorite must belong to a user.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserFavorite = mongoose.model('UserFavorite', userFavoritesSchema);

module.exports = UserFavorite;
