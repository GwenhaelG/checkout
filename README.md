# Checkout.com interview - Gwen Gilet

## Project description

Creating a page for users to see reviews and data related to a product and write a review for same product.

_Front end_
React v17

_Back end_
Node.js + Express.js with mock DB

## How to Install and Run the Project

1. Clone the **repo**
2. Install dependencies by running `npm i` in **clone repo**
3. In **/api** run `npm run start` and the server will be running at localhost:3001
4. In **/frontend** run `npm run start` and the website will be available at localhost:3000

## How to Test the Project

Run `npm run test` in the **frontend** to run the suite of tests

## How to Use the Project

Extensive commenting is provided within the project, but overall the main choice in terms of architecture are as follows:

- Use of Material UI for some base components: TextField, Typography, etc. Otherwise, all re-implemented for additional control and less reliance on external library;
- Use of CSS grid for layout over flex, and strict separation between layout and content.
- Components follow a pattern of having a main container in charge of the layout of the sub-components regardless of the characteristics of these components; and sub-components purely in charge of displaying content.
- The entry-point component is in charge of retrieving the data for the product reviews and making them available to the sub-components.
- In the review form, the input have been abstracted from the actual JSX, as to make it easy to extend/modify the set of inputs but also to allow for some or all of it to be provided by the server (dynamically generated form).

## Left to improve

- The test coverage could be extended, in particular adding integration testing with the API
- Reviews should have a timestamp, for ordering by date
- Reviews could be filtered based on ratings
- Review form could capture more detailed information, in particular splitting name into firstName and lastName
