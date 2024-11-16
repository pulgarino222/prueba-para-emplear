# Appointment Management API - Usage Guide

## Overview

This API allows managing appointments for doctors and patients. It includes endpoints to create appointments, filter them, check doctor availability, and update appointment descriptions. The API is secured with JWT authentication and requires the user to be authenticated to access most endpoints remember do the npm i and npm run start:dev.

---

## Endpoints

### **1. Create an Appointment**
- **Endpoint**: `POST /appointments`
- **Description**: Creates a new appointment for a patient with a doctor.
- **Request Body** (JSON):
  ```json
  {
    "doctorId": "doctor-uuid",
    "patientId": "patient-uuid",
    "date": "2024-11-25",
    "time": "9:00 AM",
    "description": "Routine checkup",
    "specialty": "Cardiology",
    "reason": "Annual checkup"
  }
  ```
- **Response** (JSON):
  ```json
  {
    "id": "appointment-uuid",
    "createdAt": "2024-11-01T00:00:00.000Z",
    "updatedAt": "2024-11-01T00:00:00.000Z",
    "date": "2024-11-25T09:00:00.000Z",
    "time": "9:00 AM",
    "description": "Routine checkup",
    "status": "pending",
    "specialty": "Cardiology",
    "reason": "Annual checkup",
    "doctor": {
      "id": "doctor-uuid",
      "name": "Dr. John Doe"
    },
    "patient": {
      "id": "patient-uuid",
      "name": "Jane Doe"
    }
  }
  ```
- **Success Response**: `201 Created`
- **Error Responses**:
  - `404 Not Found`: Doctor or patient not found.
  - `400 Bad Request`: Conflict with another appointment within 30 minutes of the requested time.

### **2. Filter Appointments**
- **Endpoint**: `GET /appointments/filter`
- **Description**: Filters appointments based on optional query parameters: `date`, `specialty`, and `reason`.
- **Query Parameters**:
  - `date` (optional): Filter by a specific date in ISO format (e.g., `2024-11-25`).
  - `specialty` (optional): Filter by the specialty of the doctor.
  - `reason` (optional): Filter by the reason for the appointment.
- **Response** (JSON):
  ```json
  [
    {
      "id": "appointment-uuid",
      "date": "2024-11-25T09:00:00.000Z",
      "time": "9:00 AM",
      "description": "Routine checkup",
      "specialty": "Cardiology",
      "reason": "Annual checkup",
      "doctor": {
        "id": "doctor-uuid",
        "name": "Dr. John Doe"
      },
      "patient": {
        "id": "patient-uuid",
        "name": "Jane Doe"
      }
    }
  ]
  ```
- **Success Response**: `200 OK`
- **Error Response**: `400 Bad Request` (if invalid query parameters are provided).

### **3. Update Appointment Description**
- **Endpoint**: `PATCH /appointments/:id/description`
- **Description**: Updates the description of an existing appointment.
- **URL Parameters**:
  - `id`: The UUID of the appointment to be updated.
- **Request Body** (JSON):
  ```json
  {
    "description": "Updated description for the appointment."
  }
  ```
- **Response** (JSON):
  ```json
  {
    "id": "appointment-uuid",
    "updatedAt": "2024-11-01T00:00:00.000Z",
    "description": "Updated description for the appointment."
  }
  ```
- **Success Response**: `200 OK`
- **Error Responses**:
  - `404 Not Found`: Appointment not found.

### **4. Get Doctor's Availability**
- **Endpoint**: `GET /appointments/availability/:doctorId`
- **Description**: Retrieves available hours for a doctor on a specific date.
- **URL Parameters**:
  - `doctorId`: The UUID of the doctor.
- **Query Parameters**:
  - `date`: The date for which to check the availability (in ISO format, e.g., `2024-11-25`).
- **Response** (JSON):
  ```json
  {
    "availableHours": ["9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00"]
  }
  ```
- **Success Response**: `200 OK`
- **Error Responses**:
  - `404 Not Found`: Doctor not found or invalid date provided.

---

## Authentication

All endpoints except `GET /appointments/filter` and `GET /appointments/availability/:doctorId` require JWT authentication. The `JwtAuthGuard` is applied to secure the routes.

To authenticate:
1. Login with your credentials or use OAuth to obtain a JWT token.
2. Include the token in the `Authorization` header as a Bearer token for secured endpoints.

---

## Notes
- **Date and Time Format**: The API uses ISO 8601 format for date (`YYYY-MM-DD`), and time is in a 12-hour format (e.g., `9:00 AM`).
- **Conflicts**: If a new appointment overlaps with an existing one within a 30-minute range for the same doctor, a `400 Bad Request` will be returned.



# Authentication & Patient Management - Usage Guide

## Overview

This API provides endpoints for user authentication (sign up, login, Google authentication), and patient management (create, read, update, delete patients). The authentication is secured with JWT, and Google OAuth is supported for login. The API includes role-based access control to ensure authorized access to specific operations.

---

## Authentication Endpoints

### **1. Google Authentication**
- **Endpoint**: `GET /auth/google`
- **Description**: Initiates the authentication flow with Google.
- **Response**: Redirects the user to Google’s OAuth page. After successful login, the user is redirected back to the callback endpoint.

---

### **2. Google Authentication Callback**
- **Endpoint**: `GET /auth/google/callback`
- **Description**: This endpoint is called after Google OAuth successfully authenticates the user. It issues a JWT token for the user.
- **Response**: Redirects the user to the frontend with the JWT token in the URL.
  - **Example**: `http://localhost:3001/?token=your-jwt-token`
- **Success Response**: `302 Redirect` to the frontend with the access token.

---

### **3. Register a New User**
- **Endpoint**: `POST /auth/register`
- **Description**: Registers a new user in the system.
- **Request Body** (JSON):
  ```json
  {
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepassword",
    "confirmPassword": "securepassword",
    "phone": "1234567890",
    "roles": [1, 2]
  }
  ```
- **Response** (JSON):
  ```json
  {
    "id": "user-uuid",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "roles": [
      {
        "id": 1,
        "name": "admin"
      }
    ]
  }
  ```
- **Success Response**: `201 Created`
- **Error Response**: `400 Bad Request` (e.g., if passwords don’t match).

---

### **4. Sign In (Login)**
- **Endpoint**: `POST /auth/signin`
- **Description**: Signs in an existing user with email and password.
- **Request Body** (JSON):
  ```json
  {
    "email": "john.doe@example.com",
    "password": "securepassword"
  }
  ```
- **Response** (JSON):
  ```json
  {
    "alldata": {
      "id": "user-uuid",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "roles": [
        {
          "id": 1,
          "name": "admin"
        }
      ]
    },
    "accessToken": "your-jwt-token"
  }
  ```
- **Success Response**: `200 OK`
- **Error Response**: `401 Unauthorized` (if credentials are incorrect).

---

## Patient Management Endpoints

### **1. Create a New Patient**
- **Endpoint**: `POST /patients`
- **Description**: Registers a new patient in the system.
- **Request Body** (JSON):
  ```json
  {
    "fullName": "Jane Doe",
    "dateOfBirth": "1990-01-01",
    "gender": "Female",
    "contactNumber": "123456789",
    "address": "123 Main St, City, Country"
  }
  ```
- **Response** (JSON):
  ```json
  {
    "id": "patient-uuid",
    "fullName": "Jane Doe",
    "dateOfBirth": "1990-01-01",
    "gender": "Female",
    "contactNumber": "123456789",
    "address": "123 Main St, City, Country"
  }
  ```
- **Success Response**: `201 Created`
- **Error Response**: `400 Bad Request` (if missing fields or invalid data).

---

### **2. Get All Patients**
- **Endpoint**: `GET /patients`
- **Description**: Fetches a list of all patients.
- **Response** (JSON):
  ```json
  [
    {
      "id": "patient-uuid",
      "fullName": "Jane Doe",
      "dateOfBirth": "1990-01-01",
      "gender": "Female",
      "contactNumber": "123456789",
      "address": "123 Main St, City, Country"
    }
  ]
  ```
- **Success Response**: `200 OK`
- **Error Response**: `401 Unauthorized` (if not authenticated).

---

### **3. Get a Specific Patient by ID**
- **Endpoint**: `GET /patients/:id`
- **Description**: Retrieves the details of a specific patient by their ID.
- **URL Parameter**:
  - `id`: The UUID of the patient to retrieve.
- **Response** (JSON):
  ```json
  {
    "id": "patient-uuid",
    "fullName": "Jane Doe",
    "dateOfBirth": "1990-01-01",
    "gender": "Female",
    "contactNumber": "123456789",
    "address": "123 Main St, City, Country"
  }
  ```
- **Success Response**: `200 OK`
- **Error Responses**:
  - `404 Not Found` (if patient not found).
  - `401 Unauthorized` (if not authenticated).

---

### **4. Update a Patient's Information**
- **Endpoint**: `PATCH /patients/:id`
- **Description**: Updates the information of an existing patient.
- **URL Parameter**:
  - `id`: The UUID of the patient to update.
- **Request Body** (JSON):
  ```json
  {
    "fullName": "Jane Smith",
    "contactNumber": "987654321"
  }
  ```
- **Response** (JSON):
  ```json
  {
    "id": "patient-uuid",
    "fullName": "Jane Smith",
    "dateOfBirth": "1990-01-01",
    "gender": "Female",
    "contactNumber": "987654321",
    "address": "123 Main St, City, Country"
  }
  ```
- **Success Response**: `200 OK`
- **Error Responses**:
  - `404 Not Found` (if patient not found).
  - `401 Unauthorized` (if not authenticated).

---

### **5. Delete a Patient**
- **Endpoint**: `DELETE /patients/:id`
- **Description**: Deletes an existing patient by their ID.
- **URL Parameter**:
  - `id`: The UUID of the patient to delete.
- **Response**: `204 No Content` (if patient is successfully deleted).
- **Error Responses**:
  - `404 Not Found` (if patient not found).
  - `401 Unauthorized` (if not authenticated).

---

## Authentication & Authorization

- **JWT Authentication**: For endpoints that require authentication (except for `GET /auth/google` and `GET /auth/google/callback`), the JWT token must be included in the `Authorization` header as `Bearer <token>`.
- **Roles-Based Authorization**: Some endpoints, like `POST /patients`, `GET /patients/:id`, and others, are protected by role-based guards (`RolesGuard`) to ensure that only authorized users can access them.

## Notes

- **Google OAuth Flow**: The Google authentication flow is handled through the `googleAuth` and `googleAuthCallback` endpoints. The callback endpoint issues the JWT token after successful Google login.
- **Password Encryption**: Passwords are securely stored and compared using bcrypt hashing.

tests:


{
  "doctorId": "3e7c4e7e-b0a9-4256-94fd-a7e3a9e89146",
  "patientId": "0353da11-b7c8-4391-8f9b-f57327f17a04",
  "date": "2024-11-20T10:30:00.000Z",
  "time": "10:30 AM",
  "description": "Consulta de seguimiento",
  "specialty": "Cardiología",
  "reason": "Dolor en el pecho"
}

login:{"email":"pulgarinhernandezjuanfelipe@gmail.com",
"password":"123"
}