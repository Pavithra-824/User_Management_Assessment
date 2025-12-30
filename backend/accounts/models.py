from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    role = models.CharField(max_length=10, default='user')
    status = models.CharField(max_length=10, default='active')

    REQUIRED_FIELDS = ['full_name', 'username']
    USERNAME_FIELD = 'email'