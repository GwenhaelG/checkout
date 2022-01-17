export type ratingsHistogram = {
  [key: string]: number;
};

export type ProductReview = {
  authorName: string;
  authorEmail: string;
  comment?: string;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
};

export type ProductReviewsData = {
  latestReviews: ProductReview[];
  averageReviewsRating: number;
  ratingsHistogram: ratingsHistogram;
  monthlyData: {
    month: string;
    value: number;
  }[];
};
