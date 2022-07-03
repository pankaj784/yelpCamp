const Campground = require('../models/campground')
const Review = require('../models/review')

module.exports.create = (async (req, res) => {
    const { id } = req.params
    const review = new Review(req.body.review)
    const camp = await Campground.findById(id)
    review.author = req.user._id
    camp.reviews.push(review)
    await camp.save()
    await review.save()
    req.flash('success', 'Review created')
    res.redirect(`/campgrounds/${id}`)
})

module.exports.delete = (async (req, res) => {
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Review deleted')
    res.redirect(`/campgrounds/${id}`)
})