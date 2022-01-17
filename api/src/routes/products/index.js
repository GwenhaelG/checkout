// Import modules
const products = require('express').Router();

let productsFakeReviewsData = {
  1: {
    latestReviews: [
      {
        authorName: 'Mr. T',
        authorEmail: 'mrt@gmail.com',
        comment: 'Super product!',
        rating: 5,
      },
      {
        authorName: 'Ms. R',
        authorEmail: 'mrt@gmail.com',
        rating: 4,
      },
      {
        authorName: 'Mrs. Q',
        authorEmail: 'mrt@gmail.com',
        comment: 'Super product!',
        rating: 5,
      },
      {
        authorName: 'Mr. A',
        authorEmail: 'mrt@gmail.com',
        rating: 1,
      },
      {
        authorName: 'Miss. B',
        authorEmail: 'mrt@gmail.com',
        comment: 'Super product!',
        rating: 4,
      },
    ],
    averageReviewsRating: 4.5,
    monthlyData: [
      { month: 'Sep-21', value: 4.2 },
      { month: 'Oct-21', value: 4.4 },
      { month: 'Nov-21', value: 4.1 },
      { month: 'Dec-21', value: 4.5 },
    ],
    ratingsHistogram: {
      0: 0,
      1: 1,
      2: 0,
      3: 0,
      4: 10,
      5: 15,
    },
  },
};

const processReview = (data, productId) => {
  try {
    const newRatingsHistogram = {
      ...productsFakeReviewsData[productId].ratingsHistogram,
      [data.rating.value]:
        productsFakeReviewsData[productId].ratingsHistogram[data.rating.value] +
        1,
    };
    const newAverage =
      Object.keys(newRatingsHistogram).reduce(
        (acc, cur) => acc + +cur * newRatingsHistogram[cur],
        0
      ) /
      Object.keys(newRatingsHistogram).reduce(
        (acc, cur) => acc + newRatingsHistogram[cur],
        0
      );

    productsFakeReviewsData = {
      ...productsFakeReviewsData,
      [productId]: {
        latestReviews: [
          ...productsFakeReviewsData[productId].latestReviews,
          {
            authorName: data.authorName.value,
            authorEmail: data.authorEmail.value,
            comment: data.comment.value || null,
            rating: data.rating.value,
          },
        ],
        ratingsHistogram: newRatingsHistogram,
        averageReviewsRating: newAverage,
      },
    };
  } catch (err) {
    console.error(err.message);
  }
};

// GET
products.get(`/:productId/reviewsData`, async (req, res) => {
  try {
    const { productId } = req.params;

    const productData = productsFakeReviewsData[+productId];
    if (productData) {
      res.status(200).json(productData);
    } else {
      res.status(209).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error(err.message);
  }
});

// POST
products.post(`/:productId/review`, async (req, res) => {
  try {
    const { productId } = req.params;
    const data = req.body;

    if (productsFakeReviewsData[+productId]) {
      processReview(data, productId);
      res.status(200).send();
    } else {
      res.status(209).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = products;
