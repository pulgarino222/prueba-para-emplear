
# Assestmen Project - Backend Overview

## Description

Welcome to the **Assestmen** backend project! This application is built using **NestJS**, a modern framework for building scalable and maintainable server-side applications. The project leverages cutting-edge technologies such as **JWT (JSON Web Tokens)** for secure authentication, **Passport** for OAuth integration, **TypeORM** for database interactions, and **Swagger** for auto-generating API documentation. The main goal of this project is to provide a secure, efficient, and easily maintainable architecture.

---

## Technologies Used

### **NestJS**

- **[NestJS](https://nestjs.com/)**: A powerful framework for building server-side applications with Node.js, leveraging **TypeScript** and modern architectural patterns. It provides a modular structure that enables scalable and robust code organization.
- **@nestjs/core**: The core of the NestJS framework, used to create modules, controllers, and providers.
- **@nestjs/common**: A set of common utilities, decorators, and helpers to build applications effectively in NestJS.
- **@nestjs/platform-express**: An adapter that allows NestJS to run on **Express.js**, simplifying the development of web applications.

### **Database - MySQL & TypeORM**

- **[MySQL](https://www.mysql.com/)**: A widely-used relational database management system, perfect for handling structured data and managing relationships between entities.
- **[TypeORM](https://typeorm.io/)**: An ORM (Object-Relational Mapping) tool for TypeScript and JavaScript, making database interactions seamless and simple by defining entities and relationships.
- **mysql2**: A MySQL client for Node.js, used by TypeORM to connect to MySQL databases.

### **Authentication**

- **[Passport](http://www.passportjs.org/)**: A flexible and modular authentication middleware for Node.js. This project utilizes **Google OAuth** and **JWT** strategies to handle user authentication and authorization.
  - **passport-google-oauth**: Integrates Google OAuth for user authentication.
  - **passport-jwt**: Implements JWT authentication to securely manage user sessions.
- **@nestjs/jwt**: This module integrates JWT functionality into NestJS, providing tools for creating and validating tokens.
- **bcrypt**: Used to encrypt user passwords, ensuring they are never stored in plain text in the database.

### **Swagger**

- **[Swagger](https://swagger.io/)**: A suite of tools designed for designing, documenting, and consuming RESTful APIs. This project uses **@nestjs/swagger** to automatically generate API documentation based on routes and controllers.

### **RxJS**

- **[RxJS](https://rxjs.dev/)**: A library for reactive programming that simplifies the handling of asynchronous operations and events in Angular and Node.js applications. It is used here to efficiently manage asynchronous data flows and events.

### **Testing**

- **[Jest](https://jestjs.io/)**: A widely-used JavaScript testing framework for unit and integration tests. Jest allows efficient test creation using mocks and spies.
  - **ts-jest**: A Jest preset that allows working with TypeScript, enabling tests to be written directly in TypeScript without pre-compiling to JavaScript.
- **supertest**: A library to perform HTTP tests on Express and NestJS applications, allowing you to send HTTP requests and make assertions on the responses.
- **@nestjs/testing**: A set of testing utilities specifically designed for NestJS, allowing the creation of testing modules and accessing controllers and services for unit testing.

### **Code Linting and Formatting**

- **ESLint**: A tool that ensures the source code adheres to defined style guides and best practices. Configured with the `@typescript-eslint/eslint-plugin` to analyze TypeScript code.
- **Prettier**: An automatic code formatter that ensures a consistent style throughout the codebase.

### **Other Dependencies**

- **class-transformer**: A tool used to transform objects between different representations, such as converting classes to JSON and vice versa.
- **class-validator**: Provides decorators for class-based validation. This project uses it to validate API route data, such as `CreateUserDto`.
- **reflect-metadata**: Required to enable reflection capabilities in TypeScript, primarily used by TypeORM and NestJS.
- **socket.io**: A library that enables real-time communication between the client and the server through WebSockets. It is used in this project to facilitate bi-directional communication.

---

## Project Scripts

- **build**: Compiles TypeScript code into JavaScript for production use.
- **format**: Uses Prettier to automatically format the entire source code.
- **start**: Starts the server in normal mode.
- **start:dev**: Starts the server in development mode, with hot-reloading (watch mode).
- **start:debug**: Starts the server in debug mode.
- **start:prod**: Starts the server in production mode, using compiled code.
- **lint**: Runs ESLint to analyze the code and fix any potential issues or style violations.
- **test**: Runs unit tests for the project using Jest.
- **test:watch**: Runs unit tests in "watch" mode, automatically rerunning tests as code changes.
- **test:cov**: Runs tests and generates a code coverage report.
- **test:debug**: Runs tests in debug mode.
- **test:e2e**: Executes end-to-end tests.

---

