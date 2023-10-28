# Task Geass
A modern task management application designed to help you stay organized and productive.

## Live Deployment

The application is deployed live at: [Live URL](https://clinquant-nougat-f52198.netlify.app)
The API is available at: [API Endpoint](https://expensive-boa-pajamas.cyclic.app/api-docs)

## Table of Contents

- [Task Geass](#task-geass)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Live Deployment](#live-deployment)
- [API Endpoint](#api-endpoint)
- [Usage](#usage)
- [Contribution](#contribution)
- [License](#license)
- [Contact](#contact)

## Key Features

- **User Authentication**: Safeguard your tasks and information with our user authentication system.
- **Login & Register**: Sign up to start organizing, or log in to access your tasks.
- **Secure Password Recovery**: Forget your password? Recover it securely.
- **Task Management**: Add, view, and edit tasks with ease.
- **Task Prioritization**: Determine which tasks need your attention first.
- **Mark Tasks as Complete**: Get the satisfaction of checking off completed tasks.
- **Sorting & Filtering**: Easily find and order your tasks.
- **Search**: Quickly locate specific tasks.

## Getting Started

### Prerequisites

Ensure you have the necessary software installed:
- **Node.js**: Required to run the application.
- **npm**: Node Package Manager used for managing dependencies.

### Installation

1. Clone the repository from GitHub:
   ```
   git clone https://github.com/RevoU-FSSE-2/week-18-m-istighfar.git
   ```
2. Navigate to the cloned directory:
   ```
   cd week-18-m-istighfar
   ```
3. Install the required dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open your browser and navigate to `http://localhost:5173` or the port you set.


## Tech Stack

### Frontend:

#### Core:
- **React**: A JavaScript library for building user interfaces.
- **React Router DOM**: A collection of navigational components that compose declaratively with your app.

#### Styling & UI:
- **Ant Design**: A design system with values of Nature and Determinacy for better user experience of enterprise applications.

#### Development & Build:
- **Vite**: An opinionated web dev build tool that serves your code via native ES modules.
- **TypeScript**: Superset of JavaScript that compiles to clean JavaScript output, adding optional static typing.

#### Date Handling:
- **Moment.js**: Rich, comprehensive time & date utility library.

#### PWA:
- **vite-plugin-pwa**: Vite plugin to add PWA capabilities to your project.

### Backend:

#### Core:
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.

#### Middleware:
- **Morgan**: HTTP request logger middleware for Node.js.
- **Body Parser**: Parse incoming request bodies in a middleware before your handlers.
- **Cookie Parser**: Parse Cookie header and populate `req.cookies` with an object keyed by the cookie names.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing in your application.
- **Helmet**: Helps secure Express apps with various HTTP headers.

#### Data:
- **Mongoose**: MongoDB object modeling for Node.js.

#### Authentication & Security:
- **BCrypt**: Library for hashing and salting user passwords.
- **JSON Web Token (JWT)**: Implementation for encoding and decoding JWT tokens.

#### Utility:
- **Dotenv**: Zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **Faker**: Generate massive amounts of realistic fake data in Node.js.

#### Logs:
- **Rotating File Stream**: Creates a stream that writes on a file and rotates it based on time or size.

#### Documentation:
- **Swagger UI Express**: Auto-generated API docs and a testing tool for your Express API.

## API Endpoint

The API is available at: [API Endpoint](https://expensive-boa-pajamas.cyclic.app/api-docs)

| Method | Endpoint                          | Description                             |
|--------|-----------------------------------|-----------------------------------------|
| POST   | /auth/register                    | Register a new user                      |
| GET    | /auth/verify-email/{token}        | Verify user's email address             |
| POST   | /auth/login                       | Login user                               |
| POST   | /auth/refreshToken                | Refresh the access token                 |
| POST   | /auth/request-password-reset      | Request a password reset email           |
| POST   | /auth/reset-password/{resetToken} | Reset user's password with a given token |
| GET    | /user/tasks                       | Get all tasks for the logged-in user     |
| POST   | /user/tasks                       | Create a new task for the logged-in user |
| DELETE | /user/tasks                       | Delete all tasks for the logged-in user  |
| GET    | /user/tasks/{id}                  | Get a specific task by ID                |
| PUT    | /user/tasks/{id}                  | Update a specific task by ID             |
| DELETE | /user/tasks/{id}                  | Delete a specific task by ID             |
| PATCH  | /user/tasks/{id}/complete         | Mark a specific task as complete         |
| GET    | /admin/list-user                  | Get a list of all users (Admin only)     |
| POST   | /admin/create-user                | Create a new user (Admin only)           |
| PUT    | /admin/update-user/{id}           | Update a specific user by ID (Admin only)|
| DELETE | /admin/delete-user/{id}           | Delete a specific user by ID (Admin only)|




