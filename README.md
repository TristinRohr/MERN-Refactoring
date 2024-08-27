# MERN Refactoring Project

## Overview

This project is a refactoring exercise for a full-stack MERN (MongoDB, Express, React, Node.js) application. The application is built with a clear separation of concerns between the frontend (client) and backend (server) components. The frontend is developed using React and Vite, while the backend is powered by Node.js, Express, and MongoDB, with GraphQL used for handling API requests.

## Features

- **Authentication**: Secure user login and registration using JWT.
- **Book Search**: Search for books using the Google Books API.
- **Book Saving**: Users can save books to their profile.
- **Responsive Design**: The frontend is responsive and works well on different screen sizes.

## Project Structure

- **Root Directory**
  - `README.md`: Project documentation.
  - `package.json`: Defines dependencies and scripts for the root.
  - `.git/`: Git version control files.

- **Client Directory (`client/`)**
  - `index.html`: The main HTML file.
  - `vite.config.js`: Configuration for Vite, a fast build tool for frontend development.
  - `src/`: Contains all source files for the React frontend.
    - `components/`: React components like `Navbar`, `SignupForm`, and `LoginForm`.
    - `pages/`: Pages for different routes like `SearchBooks` and `SavedBooks`.
    - `utils/`: Utility functions such as `auth`, `queries`, and `mutations`.
    - `App.jsx`: Main React application component.
    - `App.css`: Global styles for the application.

- **Server Directory (`server/`)**
  - `server.js`: Entry point for the Node.js server.
  - `config/`: Configuration files, including database connections.
  - `models/`: MongoDB models for `User` and `Book`.
  - `schemas/`: GraphQL schemas, resolvers, and typedefs for API handling.
  - `utils/`: Utility functions like JWT authentication.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/TristinRohr/MERN-Refactoring.git
   cd MERN-Refactoring
   ```

2. **Install dependencies for the entire project**:

   ```bash
   npm run install
   ```

   This will install dependencies for both the client and server.

## Usage

### Running the Application

1. **Start the application (frontend and backend simultaneously)**:
   From the root directory, run:

   ```bash
   npm run develop

   ```

   This will use `concurrently` to start both the backend server and the frontend development server in development mode.

2. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

### Building for Production

1. **Build the frontend**:

   ```bash
   npm run build
   ```

2. **Start the server with the built frontend**:
   Ensure your server is configured to serve static files from the `client/dist` directory.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
