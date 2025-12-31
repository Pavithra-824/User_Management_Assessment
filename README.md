# User Management System – Backend Intern Assessment
Demo video:
https://drive.google.com

https://github.com/user-attachments/assets/fd3f22c3-57d9-436f-b90d-ea555bdb9ed9

/file/d/1i_tAOONrO109arVNQKrJaJW5FVpkls1y/view?usp=drivesdk

## Project Overview & Purpose
This project is a User Management System built as part of a Backend Intern Assessment.
The purpose of this project is to demonstrate backend fundamentals such as user authentication,
secure password handling, API design, and frontend-backend integration.

## Note on Deployment Issue

The core backend functionality (signup, login, profile view, and profile update)
works correctly in a local development environment.

During deployment on Render (free tier), the application encounters a request
handling issue when processing JSON payloads for certain API endpoints.
This occurs due to environment-level constraints related to database initialization
and request parsing during deployment.

The issue was identified during debugging and is not related to the application
logic or authentication flow. With proper environment control or shell access
to manage migrations and configuration, the same codebase runs as expected
without any changes.

This limitation has been documented transparently as part of the submission.

The system allows users to:
- Sign up with secure password hashing
- Log in and receive a JWT token
- View their profile
- Update their profile details

---

## Tech Stack Used

### Backend
- Python
- Django
- Django REST Framework
- JWT Authentication (SimpleJWT)
- PostgreSQL

### Frontend
- React
- Axios
- React Router

### Deployment
- Backend: Render
- Frontend: Vercel

---

## Setup Instructions

### Backend Setup
```
```cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver ```
```
Backend will run at:
```
cpp
Copy code
http://127.0.0.1:8000/
Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
Frontend will run at:
```
arduino
Copy code
```http://localhost:5173/
Environment Variables
Backend Environment Variables
(Values are not committed for security reasons) ```

SECRET_KEY

DEBUG
```
DATABASE_URL

Frontend Environment Variables
VITE_API_URL

Deployment Instructions
Backend Deployment (Render)
Push the backend code to GitHub.

Create a new Web Service on Render.

Set the build command:
```
css
Copy code
pip install -r requirements.txt && python manage.py migrate
Set the start command:

nginx
Copy code
gunicorn core.wsgi:application
Add environment variables in the Render dashboard.

Deploy the service.

Frontend Deployment (Vercel)
Push frontend code to GitHub.

Import the repository into Vercel.

Set the environment variable:

ini
Copy code
VITE_API_URL=<Backend URL>
Deploy the application.

API Documentation
Authentication APIs
Signup API
Endpoint

bash
Copy code
POST /api/signup/
Request Body

json
Copy code
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Test@1234"
}
Success Response

json
Copy code
{
  "message": "User created successfully"
}
Login API
Endpoint

bash
Copy code
POST /api/login/
Request Body

json
Copy code
{
  "username": "testuser",
  "password": "Test@1234"
}
Success Response

json
Copy code
{
  "token": "<JWT_ACCESS_TOKEN>",
  "user": {
    "username": "testuser",
    "email": "test@example.com"
  }
}
User Profile API
View Profile
Endpoint

bash
Copy code
GET /api/profile/
Headers

makefile
Copy code
Authorization: Bearer <JWT_ACCESS_TOKEN>
Response

json
Copy code
{
  "username": "testuser",
  "email": "test@example.com"
}
Update Profile
Endpoint

bash
Copy code
PUT /api/profile/
Headers

makefile
Copy code
Authorization: Bearer <JWT_ACCESS_TOKEN>
Request Body

json
Copy code
{
  "email": "updated@example.com"
}
Response

json
Copy code
{
  "message": "Profile updated successfully"
}
API Testing
Postman Collection
The APIs can be tested using Postman.
```

Live Deployment Links
GitHub Repository:
https://github.com/Pavithra-824/User_Management_Assessment

Frontend (Vercel):
https://user-management-assessment-self.vercel.app/

Backend (Render):
https://user-management-assessment.onrender.com

Walkthrough Video
A walkthrough video explaining the project architecture, backend logic,
API flow, and deployment details is provided as part of the submission.
