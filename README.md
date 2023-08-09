# company_project

I'm excited to share that I've successfully completed the project within 8 hours. I've developed a Node.js application with
 CRUD operations for users, products, carts, orders, and addresses using JSON files for storage. The code is available on GitHub along with a Postman collection showcasing API functionality.

GitHub Repository: https://github.com/shyamgupta5555/company_assgment

I'm glad to have met the project's requirements in a timely manner. Looking forward to your feedback and any further steps.



## installation   
#start project                                                                                        

#Clone the repository: git clone

#Install the dependencies: npm install.

#Navigate to the project directory: cd src

#Start the server: npx nodemon 

#Access the API endpoints using a tool like Postman.

### POST /register

- Create a user document from request body.
- **Response format**
# all flied is require in user details

{

     {
    "id": 1,
    "name": "shyam Doe",
    "email": "john@example.com",
    "password": "shyam@gmail.com",
    "role": "admin"
  }
}







### FEATURE II - products

## post /createProduct/:id
# all flied is require in products details
-create a products from request body
-only seller add products

- **response format




{
  {
  
    "id": 1,
    "name": "Product A",
    "price": 19.99,
    "seller": "John Doe"
  
  }
}




## update updateProduct/:productId

- **response format**
# any one  flied is update



{
  {

  
    "id": 1,
    "name": "Product A",
    "price": 19.99,
    "seller": "John Doe"


    
  }
}





### delete deleteProduct/:productId
# params provide productId


{
  {
  
    "message": "successfully deleted"  
    
    }
}







### FEATURE III - carts

## post /createCart/:id
# params provide userId
# all   flied required



{
   {

   
    "id": 1,
    "userId": 2,
    "products": [
      {
        "productId": 1,
        "quantity": 2
      },
      {
        "productId": 3,
        "quantity": 1
      }
    ]

    
  }
}





## get /getCart/:cartId" 
# params provide cartId 


{
   {

   
    "id": 1,
    "userId": 2,
    "products": [
      {
        "productId": 1,
        "quantity": 2
      },
      {
        "productId": 3,
        "quantity": 1
      }
    ]

    
  }
}





## put /removeItem/:cartId" 

# params provide cartId
# only one  flied required productId 


{
   
      {
        "productId": 1
      }
    
}



## put /addItem/:cartId" 
# params provide cartId
# only one  flied required productId 

{
   
      {
        "productId": 1,
        "quantity": 2
      }
    
}



## delete /deleteCart/:cartId" 
# params provide cartId

{
  {

  
    "message" :"successfully  delete"

    
  }
}




### FEATURE IIII - order




## post /createOrder/:cartId" 
# only  params provide cartId

{
   {

   
    "id": 1,
    "userId": 2,
    "products": [
      {
        "productId": 1,
        "quantity": 2
      },
      {
        "productId": 3,
        "quantity": 1
      }
    ],
    "total": 49.97

    
  }
}

## get /getOrder/:orderId" 
# only params provide cartId



{
   {

   
    "id": 1,
    "userId": 2,
    "products": [
      {
        "productId": 1,
        "quantity": 2
      },
      {
        "productId": 3,
        "quantity": 1
      }
    ],
    "total": 49.97

    
  }
}






### FEATURE IIIII - address




## post /address/:userId" 
# params provide userId
# all  flied required 

{
   {
   
    "street": "  St",
    "id": 1,
    "city": "Exampleville",
    "state": "CA",
    "zip": "12345"

    
  }
}

## update "/addressUpdate/:addressId" 
# params provide addressId
# any one  or two flied required 



{
   {

   
    "street": "  St",
    "id": 1,
    "city": "Exampleville",
    "state": "CA",
    "zip": "12345"

    
  }
}



## get "/addressGet/:addressId" 
# params provide addressId

{
   {

   
    "street": "  St",
    "id": 1,
    "city": "Exampleville",
    "state": "CA",
    "zip": "12345"

    
  }
}





### used technologies used
## node js
## expressjs 
## Json
