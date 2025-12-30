from django.test import TestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class UserManagementTests(TestCase):
    def setUp(self):
        self.user_data = {
            "email": "testuser@example.com",
            "password": "SecurePassword123",
            "full_name": "Test User"
        }

    def test_create_user(self):
        """Test if a user can be created successfully"""
        user = User.objects.create_user(**self.user_data)
        self.assertEqual(user.email, self.user_data["email"])
        self.assertTrue(user.check_password(self.user_data["password"]))

    def test_user_is_not_staff_by_default(self):
        """Verify role-based logic: normal users are not staff"""
        user = User.objects.create_user(**self.user_data)
        self.assertFalse(user.is_staff)

    def test_create_superuser(self):
        """Test admin role creation"""
        admin = User.objects.create_superuser(
            email="admin@example.com", 
            password="AdminPassword123",
            full_name="Admin User"
        )
        self.assertTrue(admin.is_staff)
        self.assertTrue(admin.is_superuser)

    def test_duplicate_email_fails(self):
        """Ensure unique email constraint is working"""
        User.objects.create_user(**self.user_data)
        with self.assertRaises(Exception):
            User.objects.create_user(**self.user_data)

    def test_full_name_storage(self):
        """Verify custom field 'full_name' is saved correctly"""
        user = User.objects.create_user(**self.user_data)
        self.assertEqual(user.full_name, "Test User")