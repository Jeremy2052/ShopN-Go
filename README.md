# ShopN-Go

MERN application where users can create an account and shop through the products to add to their cart and checkout. Product data is retrieved from MongoDB with Axios.
Redux toolkit is used to manage the user and cart state. JWT and Crypto.js is used to assign a unique token and encrypt the user’s password.

#Functionalities
Users have an option to register/login an account. Users can  browse the web application and add products to the cart but must have an account to view the cart and order page.
JWT is used to assign a unique token when an account is registered and used for authentication when adding products and checking out for payment.
User can use key words such as "shirt", "pants", "summer", or "winter" to filter products from the search bar. Categories are available on the home page to selecte and
be redirected to the category page. User is able to increment/decrement the quantity of the product and add it to their cart. At the cart page, the user is able to see all products added
and checkout for payment implemented with Stripe. Once payment is successful the order is added and is able to be viewed on the order page from the navbar.


#Running Tests
Jest and Enzyme are used to test the components on client side. In order to run tests:
```
cd client
yarn test
```
Tests are used to test if the components are rendering without any crashes, certain components are rendered with the correct content and if buttons are functional.
