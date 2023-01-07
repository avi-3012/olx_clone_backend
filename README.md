
# OLX-CLONE

This is a **Backend Repository** for the functional OLX clone.
For Frontend Repository ```https://github.com/avi-3012/olx_clone_frontend```

## Features:

- User can Login or register themselves.
- User can see all the listed products(**Unsold**) without login.
- User can also see all the listed products(Unsold, ***excluding products listed by the user itself***) on homepage after **Login**.
    ### After Login
    
- User can access different pages through the **Menu** provided in **Navbar**.
- User can list their own product through **Sell Page**.
- User can see their own listed products( **with Sold and Unsold status** ) in **My Products** section through **Account page**.
- User can see their all ordered product in **My Orders** section through **Account Page**.
- User will be remained logged in for all future visits to this domain until user Logs out through the **Log Out** button in **Menu**

## INSTALLATION 


- Open Terminal and clone the Repository.

    ```git clone https://github.com/avi-3012/olx_clone_backend.git```

- Then, Change directory to the backend folder.

    ```cd olx_clone_backend/```

- Now, Create a ```.env``` file and place it in root directory of backend folder with below content. Be sure to replace *{Your Mongo Database Url}*.

    ```MONGO_URL={Your Mongo Database Url}```

- Install all node_modules.

    ```npm install```

- Run the backend server.

    ```npm run dev```

    Now open your preferred browser and go to ```http://localhost:8080/``` If it shows "Hello World!", then **Congrats!!** you have successfully deployed the OLX-CLONE **backend** on your local network.
    
## MONGO DB COLLECTIONS
- user-data: To store login info. (Email, Password)
- product-data: To store product info. (Name, Price, Date Listed, Image Path, Sold Status, Person Email who listed the product)
- order-data: To store purchase history. (Email of the person who bought the product, ProductID(Fetched from product-data while buying), Date Bought)

## API CALLS

- GET /

    To test the server if it's running or not.
    
- POST /api/users/register

    To register user. Takes two variables from req body as email and password. Then, it creates entry into user-data.
    
- POST /api/users/login

    To make login into app. Takes two variables from req body and find it in user-data collection. If found, then it creates a JWT Token and returns a response with status: ok and that particular Token which gets stored in local storage of the user.

- GET /api/users/verify

    To verify the user for any task. Takes x-acces-token from headers and verify it with JWT and stores the email in a variable. Then, it finds the email in the user-data. If found, it returns a response with status:ok.
    
- POST /api/sell

    To list item for sell. Takes token from req body and verifies user. If found then it takes all req body items and create entry into product-data while keeping isSold status false and storing image in a static "uploads" folder. (Note: This can also be achieved with S3 buckets)
    
- GET /api/products

    To get all products with isSold status false.
    
- POST /api/products/buy/:id

    To buy a product. Takes token from x-access-headers and verifies it. Then, it takes product ID from params and find one in product-data with isSold status false. If found, then update the isSold status to true and create another entry in order-data with the product ID, date and the email which was used for verification early.
    
- GET /api/product/:id

    To get a specific product data.
    
- GET /api/account/myorders/:id

    To find products user bought. Verifies user with JWT token, and returns the response with order data of that specific email.
    
- GET /api/account/myproducts/:id

    To find products user listed. Verifies user with JWT token, and returns the response with product data of that specific email.
