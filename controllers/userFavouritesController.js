const UserFavorite = require("./../models/userFavouritesModel")
const catchAsync = require("./../utils/catchAsync")


exports.setFav = catchAsync( async (req, res, next) => {
    console.log(req.user)
    const userId = req.user._id;
    const tourId = req.params.tourId;

    // Check if the tour is already favorited by the user to prevent duplicates
    const existingFavorite = await UserFavorite.findOne({ user: userId, tour: tourId });
    if (existingFavorite) {
        return res.status(400).json({ status: 'fail', message: 'Tour is already set as favorite' });
      }
    const newFavorite = await UserFavorite.create({ tour: tourId, user: userId });

    res.status(201).json({
        status: 'success',
        data: {
          favorite: newFavorite
        }
      });
})
exports.getFav = catchAsync( async (req, res, next) => {
    const userId = req.user._id;

    const favorites = await UserFavorite.find({ user: userId }).populate('tour');

    // Map through the favorites to return only the tour information
    const favoriteTours = favorites.map(fav => fav.tour);

    res.status(200).json({
      status: 'success',
      results: favoriteTours.length,
      data: {
        tours: favoriteTours
      }
    });
})