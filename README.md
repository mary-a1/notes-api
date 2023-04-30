# Notes-API Backend Project

A secure and scalable RESTful API that allows users to create, read, update, and delete notes. This application also allows users to share their notes with other users and search for notes based on keywords.

## Framework
- Express: It provided a robust set of tools and middleware to handle HTTP requests and responses, routing, session management, authentication, and more.
- PostgreSQL: It is a powerful open-source relational database management system.In terms of integrating with an Express.js backend, PSQL provided a stable and scalable solution for persisting application data. 

## Dependencies
- bcryptjs: a library for hashing passwords.
- cookie-parser: a middleware for parsing cookies in Node.js application.
- dotenv: a zero-dependency library that loads environment variables from a .env file into process.env. 
- express: a popular Node.js web framework that provides a set of features and middleware.
- morgan: a middleware for logging HTTP requests in Node.js application.
- pg: a Node.js library that provides a set of features for connecting to and querying databases, such as connection pooling, parameterized queries, and query building 
- validator: provides a set of functions for validating different types of data, such as strings, numbers, and email addresses.

## Setup
- To access this project clone this repository in your terminal
  ```sh
  $ git clone https://github.com/mary-a1/notes-api.git
  ```
- Go to notes-api directory
  ```sh
  cd notes-api
  ```
- Install dependencies with 
  ```sh 
  npm install
  ```
- Setup the server:
  - Create .env file inside the notes-api folder and copy content from .env.example into .env
  - Fill in the necessary PostgreSQL configuration
    - (  eg. 
    PORT=8080
    DB_HOST=localhost
    DB_USER=labber
    DB_PASSWORD=labber
    DB_NAME=speer
    DB_PORT=5432
    )
  - Go into psql
    ```sh
    psql
    ```
  - Create a db 
    ```sh
    CREATE DATABASE speer;
    ```
  - Creat user 
    ```sh
    CREATE USER labber WITH ENCRYPTED PASSWORD 'labber';
    ```
  - Granting access to user 
    ```sh 
    GRANT ALL PRIVILEGES ON DATABASE speer TO labber;
    ```
  - Exit psql
    ```sh 
    \q
    ```
  - Run database reset 
    ```sh
    npm run db:reset
    ```
  - To run API server
    ```sh
    npm start
    ```

## Running Mocha Chai Testing Framework
- In the directory notes-api
  ```sh
  npm test
  ```
