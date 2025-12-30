# backend/accounts/urls.py
from django.urls import path
# Add UserProfileView, SignupView, and UserListView to this import line
from .views import LoginView, SignupView, UserProfileView, UserListView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('profile/update/', UserProfileView.as_view(), name='profile_update'),
    path('admin/users/', UserListView.as_view(), name='user_list'),
]