from django.urls import path
from accounts import views  # Importing the module instead of individual views to avoid circularity

urlpatterns = [
    # Authentication Endpoints
    path('signup/', views.RegisterView.as_view(), name='auth_signup'),
    path('login/', views.LoginView.as_view(), name='auth_login'),
    path('logout/', views.LogoutView.as_view(), name='auth_logout'),
    
    # User Profile & Management
    path('profile/', views.UserProfileView.as_view(), name='user_profile'),
    path('change-password/', views.ChangePasswordView.as_view(), name='change_password'),
    
    # Admin Specific Endpoints
    path('admin/users/', views.AdminUserListView.as_view(), name='admin_user_list'),
    path('admin/users/<int:pk>/status/', views.UserStatusUpdateView.as_view(), name='user_status_update'),
]