# Task Manager Application (Binaried Assignment)

A secure, full-stack Task Management application built with Angular, Node.js, and MongoDB.

## Key Features
* **Full-Stack CRUD:** Seamless management of tasks and user interactions.
* **JWT Authentication:** Secure login and registration with route-protected dashboard access.
* **Interceptor-Based Auth:** Automatic token handling via HTTP interceptors for secure API communication.
* **Responsive Design:** Clean, minimal UI built for performance.

## AI Engineering Workflow
* **Code Collaboration:** Used AI tools for architectural design, debugging routing logic, and optimizing backend data handling.
* **Efficiency:** Leveraged AI to accelerate boilerplate development, allowing me to focus on engineering robust security guards and custom interceptor logic.

## Application UI

### Registration Page
![Register Page](assets/Register.png)

### Login Page
![Login Page](assets/login.png)

### Dashboard
![Dashboard](assets/Dashboard.png)

## Setup Instructions
1. **Prerequisites:** Node.js (v18+) and a MongoDB instance.
2. **Backend:**
   * `cd backend`
   * `npm install`
   * Create a `.env` file with `PORT`, `MONGO_URI`, and `JWT_SECRET`.
   * `npm run dev`
3. **Frontend:**
   * `cd frontend`
   * `npm install`
   * `ng serve`

## Challenges & Resolutions
* **Challenge:** Resolved a navigation deadlock where components were correctly authenticating but failing to trigger the router viewport update.
* **Resolution:** Centralized auth-state persistence within `sessionStorage` to align token visibility across route guards.

## Future Improvements
* **Real-time Synchronization:** Integrate Socket.io for live updates.
* **Testing:** Implement comprehensive unit tests for backend route controllers using Jest.