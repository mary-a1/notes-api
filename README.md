# Notes-API Backend Project

A secure and scalable RESTful API that allows users to create, read, update, and delete notes. This application also allows users to share their notes with other users and search for notes based on keywords.

## Dependencies
- bcryptjs
- cookie-parser
- dotenv
- express
- morgan
- pg
- validator

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
    DB_DATABASE=speer
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
    GRANT ALL PRIVILEGES ON DATABASE pharmali TO labber;
    ```
  - Exit psql

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
