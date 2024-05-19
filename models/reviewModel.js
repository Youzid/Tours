const mongoose = require('mongoose');
// const validator = require('validator');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'A review text is required'],
      maxlength: [
        40,
        'A review name must have less or equal then 40 characters'
      ]
    },
    rating: {
      type: Number,
      required: [true, 'A review rating is required'],
      min: [1, 'A review must have a minimum of 1'],
      max: [5, 'A review must have a maximum of 5'],
      maxlength: [
        40,
        'A review name must have less or equal then 40 characters'
      ]
    },

    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },

    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'A tour  is required']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A user  is required']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()

// reviewSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// reviewSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// reviewSchema.pre('find', function(next) {

reviewSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

reviewSchema.pre(/^find/, async function(next) {
  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
