const UserFavorite = require("./../models/userFavouritesModel")
const catchAsync = require("./../utils/catchAsync")


exports.setFav = catchAsync( async (req, res, next) => {
    const userId = req.user._id;
    const tourId = req.params.tourId;

    // Check if the tour is already favorited by the user
    const existingFavorite = await UserFavorite.findOne({ user: userId, tour: tourId });

    // If it exists, remove it from favorites
    if (existingFavorite) {
        await UserFavorite.deleteOne({ _id: existingFavorite._id });
        return res.status(201).json({ 
            status: 'success', 
            message: 'Tour has been removed from favorites' 
        });
    } else {
        // If it's not favorited yet, add it to favorites
        const newFavorite = new UserFavorite({
            user: userId,
            tour: tourId
        });
        await newFavorite.save();
        return res.status(200).json({ 
            status: 'success', 
            message: 'Tour has been added to favorites' 
        });
    }



    
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