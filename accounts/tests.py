from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

User = get_user_model()

class UserAuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.signup_url = '/api/auth/signup/'
        self.login_url = '/api/auth/login/'

    def test_user_signup_success(self):
        # Test 1: Successful signup with valid data
        data = {"email": "test@example.com", "password": "Password123", "full_name": "Test User"}
        response = self.client.post(self.signup_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_duplicate_email_signup_fails(self):
        # Test 2: Ensure unique email constraint [Requirement: Unique email]
        User.objects.create_user(email="test@example.com", username="test@example.com", password="Password123", full_name="User 1")
        data = {"email": "test@example.com", "password": "Password123", "full_name": "User 2"}
        response = self.client.post(self.signup_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_weak_password_signup_fails(self):
        # Test 3: Ensure password strength validation [Requirement: Password validation]
        data = {"email": "weak@example.com", "password": "123", "full_name": "Weak User"}
        response = self.client.post(self.signup_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_success_and_token(self):
        # Test 4: Verify credentials and token return [Requirement: JWT Token]
        User.objects.create_user(email="login@example.com", username="login@example.com", password="Password123", full_name="Login User")
        data = {"email": "login@example.com", "password": "Password123"}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    def test_unauthenticated_profile_access_fails(self):
        # Test 5: Verify route protection [Requirement: Protected routes]
        response = self.client.get('/api/auth/profile/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)