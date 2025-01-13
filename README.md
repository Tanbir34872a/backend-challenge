# Backend Challenge
###### of 6sense Technologies

This project is a backend service built with NestJS and TypeORM, using MongoDB as the database. It includes functionality for managing products and categories, with a focus on generating unique product codes and calculating pricing with discounts.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Data Model Diagram](#data-model-diagram)
- [Entities](#entities)
- [API Endpoints](#api-endpoints)
- [License](#license)

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