from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
    )
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    )

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    full_name = models.CharField(max_length=255)

    # Auto-managed date fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_login_timestamp = models.DateTimeField(null=True, blank=True)

    # Email is used as the primary identifier instead of username
    USERNAME_FIELD = 'email'
    # 'username' is still in the DB but not required for createsuperuser/login
    REQUIRED_FIELDS = ['full_name', 'username'] 

    def __str__(self):
        return self.email