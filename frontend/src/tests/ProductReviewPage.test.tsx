import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import ProductReviewPage from '../views/ProductReviewPage';

const successResult = {
  status: 200,
  data: {
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
      { month: 'Sep-21', value: 3.2 },
      { month: 'Oct-21', value: 3.4 },
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
const failureResult = { status: 209 };

const getSuccess = jest.fn(() => Promise.resolve(successResult));
const getFail = jest.fn(() => Promise.resolve(failureResult));

configure({ adapter: new Adapter() });
test('CheckboxWithLabel changes the text after click', () => {
  const productReview = shallow(
    <ProductReviewPage productId={1} productTitle='Super Awesome Product' />
  );

  //   expect(productReview.text()).toEqual('Super Awesome Product');

  //   checkbox.find('input').simulate('change');

  //   expect(checkbox.text()).toEqual('On');
});
