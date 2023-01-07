
# OLX-CLONE

This is a **Backend Repository** for the functional OLX clone.

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

    Now open your preferred browser and go to ```http://localhost:5000/``` If it shows "Hello World!", then **Congrats!!** you have successfully deployed the OLX-CLONE **backend** on your local network.

