from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'full_name', 'role', 'is_active')
    list_filter = ('role', 'is_active')

    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('full_name', 'role')}),
    )

admin.site.register(User, CustomUserAdmin)
