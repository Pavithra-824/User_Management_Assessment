from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # These fields must match your 0001_initial.py exactly
    email = models.EmailField(unique=True)
    role = models.CharField(
        max_length=10, 
        choices=[('admin', 'Admin'), ('user', 'User')], 
        default='user'
    )
    status = models.CharField(
        max_length=10, 
        choices=[('active', 'Active'), ('inactive', 'Inactive')], 
        default='active'
    )
    full_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_login_timestamp = models.DateTimeField(null=True, blank=True)

    # Use email as the primary identifier if desired, or keep default username
    REQUIRED_FIELDS = ['full_name', 'username']
    USERNAME_FIELD = 'email'