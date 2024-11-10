# Project Name

This project provides a RESTful API for user authentication and management using Node.js, Express, MongoDB, and Mongoose. It supports common user-related actions such as registration, login, updating profiles, deleting accounts, and listing all users. The project includes a test suite for automated testing of key endpoints.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Docker Setup](#docker-setup)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)

## Features

- **User Registration**: Create new user accounts with roles, referral codes, and other details.
- **User Login**: Authenticate users and issue JSON Web Tokens (JWTs) for session management.
- **User Profile Update**: Allow users to update their profile information.
- **User Deletion**: Delete user accounts by ID.
- **User Listing**: Retrieve a list of all users in the system.

## Technologies

- **Node.js** and **Express** for server and API handling
- **MongoDB** and **Mongoose** for data storage and management
- **JWT** for secure authentication
- **Supertest** for HTTP assertions and endpoint testing
- **Jest** for unit and integration tests

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mightstar/clutch-audience-assessment.git
   cd project-folder
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a .env file:
   ```bash
   MONGO_URI=mongodb://localhost:27017/test
   JWT_SECRET=your_jwt_secret 
   BASE_URL=http://localhost:3000
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## Docker Setup
### Build and Run the Docker Containers
   Open a terminal in your project directory and run:
   ```bash
   docker-compose up --build
   ```
   This command will build your Docker image and start both the app and MongoDB services.


## Testing
  To run tests, execute the following command:
  ```bash
  npm test
  ```
  The test suite uses Jest and Supertest to automate testing of all API endpoints and ensure accurate functionality.

## API Endpoints

### User Registration

- **Endpoint**: `POST /user/register`
- **Description**: Registers a new user.
- **Parameters**:
  - `name`: User's full name.
  - `email`: User's email.
  - `password`: Password (validated for complexity).
  - `passwordConfirm`: Password confirmation.
  - `role`: Role of the user.
  - `referralCode` (optional): Code for referring new users.
  - `referredBy` (optional): Code of the user who referred the new user.

### User Login

- **Endpoint**: `POST /user/login`
- **Description**: Logs in a user and returns a JWT.
- **Parameters**:
  - `email`: User's email.
  - `password`: User's password.

### User Update

- **Endpoint**: `PATCH /user/:id`
- **Description**: Updates a user's profile information.
- **Authorization**: Bearer token required.

### Delete User

- **Endpoint**: `DELETE /user/:id`
- **Description**: Deletes a user by ID.

### List Users

- **Endpoint**: `GET /users`
- **Description**: Returns a list of all users.
- **Authorization**: Bearer token required.

## Usage

- To register a user, send a `POST` request to `/user/register` with required fields in the body.
- To log in, send a `POST` request to `/user/login` with `email` and `password`.
- Use the provided JWT token in headers (`Authorization: Bearer <token>`) for accessing protected routes.
