from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    # This determines what you see in the list view
    list_display = ('email', 'full_name', 'role', 'status', 'is_staff')
    # This adds a sidebar filter
    list_filter = ('role', 'status')
    
    # This allows you to edit the 'role' and 'status' in the admin panel
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('role', 'status', 'full_name')}),
    )

admin.site.register(User, CustomUserAdmin)