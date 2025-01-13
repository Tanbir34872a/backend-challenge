# Backend Challenge
###### of 6sense Technologies

This project is a backend service built with NestJS and TypeORM, using MongoDB as the database. It includes functionality for managing products and categories, with a focus on generating unique product codes and calculating pricing with discounts.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Data Model Diagram](#data-model-diagram)
- [Entities](#entities)
- [API Endpoints](#api-endpoints)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/backend-challenge.git
   cd backend-challenge
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your MongoDB connection in app.module.ts:
    ```
   TypeOrmModule.forRoot({
        type: 'mongodb',
        url: 'mongodb://localhost:27017/mongosense',
        synchronize: true, //! Don't use this in production
        entities: [Product, Category],
    }),
    ```
4. Start the application:
    ```
    npm run start:dev
    ```

## Usage
The application provides a REST API for managing products and categories. You can use tools like Postman or curl to interact with the API.

## Data Model Diagram
Below is the data model diagram illustrating the relationships between entities such as products and categories.
![Data Model Diagram](/DMD.drawio.svg)

## Entities
#### Products
- _id: Unique identifier for the product
- name: Name of the product
- description: A brief description of the product
- price: Price of the product
- discount: Discount percentage on the product
- image: Product's image URL
- status: Availability status (Stock Out / In Stock)
- productCode: An auto-generated unique identifier
- categoryId: Foreign key referencing the category
#### Categories
- _id: Unique identifier for the category
- name: Name of the category
- description: A brief description of the category
## API Endpoints
#### Categories
- POST /categories: Create a new category
  -Request
  ```json
  {
    "name": "Blenders",
    "description": "Devices and gadgets"
  }
  ```
  -Response
  ```json
  {
    "name": "Blenders",
    "description": "Devices and gadgets",
    "_id": "678566041cac96921e211361"
  }
  ```
- GET /categories: Get all categories (For testing purpose)
- GET /categories/\:id: Get a category by ID (For testing purpose)
#### Products
- POST /products: Create a new product
  -Request
  ```json
  {
    "name": "Fixit Felix",
    "description": "An efficient debugger",
    "price": 160.00,
    "discount": 5,
    "image": "https://example.com/images/fixit-felix.jpg",
    "status": "In Stock",
    "categoryId": "67852d0417aa380cd7540a06"
  }
  ```
  -Response
  ```json
  {
    "name": "Fixit Felix",
    "description": "An efficient debugger",
    "price": 160,
    "discount": 5,
    "image": "https://example.com/images/fixit-felix.jpg",
    "status": "In Stock",
    "productCode": "4d4cf0a-0fix2",
    "categoryId": "67852d0417aa380cd7540a06",
    "_id": "678565ab1cac96921e211360"
  }
  ```
- PATCH /products/\:id: Update a product by ID
  -Request
  ```json
  {
    "description": "He can FIX IT"
  }
  ```
  -Response
  ```json
  {
    "_id": "678565ab1cac96921e211360",
    "name": "Fixit Felix",
    "description": "He can FIX IT",
    "price": 160,
    "discount": 5,
    "image": "https://example.com/images/fixit-felix.jpg",
    "status": "In Stock",
    "productCode": "4d4cf0a-0fix2",
    "categoryId": "67852d0417aa380cd7540a06"
  }
  ```
- GET /products: Get products with optional filters
  -Request by query
  ``` 
  {{base_url}}/products?categoryId=67852d0417aa380cd7540a06&name=Fi
  ```
  -Response
  ```json
  [
    {
      "_id":"6785657d1cac96921e21135f",
      "name":"Fitness Regime",
      "description":"An efficient sorting gadget",
      "price":160,
      "discount":5,
      "image":"https://example.com/images/alpha-sorter.jpg",
      "status":"In Stock",
      "productCode":"43bbcf7-8egim11",
      "categoryId":"67852d0417aa380cd7540a06",
      "discountPrice":152
    },
    {
      "_id":"678565ab1cac96921e211360",
      "name":"Fixit Felix",
      "description":"He can FIX IT",
      "price":160,
      "discount":5,
      "image":"https://example.com/images/fixit-felix.jpg",
      "status":"In Stock",
      "productCode":"4d4cf0a-0fix2","categoryId":"67852d0417aa380cd7540a06","discountPrice":152
    }
  ]
  ```

