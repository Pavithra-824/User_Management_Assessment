from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Role choices matching your frontend logic
    ROLE_CHOICES = (('admin', 'Admin'), ('user', 'User'))
    # Status choices matching your views.py checks
    STATUS_CHOICES = (('active', 'Active'), ('inactive', 'Inactive'))

    email = models.EmailField(unique=True) # Required for unique login
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    full_name = models.CharField(max_length=255)
    
    # Auto-managed date fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_login_timestamp = models.DateTimeField(null=True, blank=True)

    # Email is used as the primary identifier instead of username
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name']

    def __str__(self):
        return self.email