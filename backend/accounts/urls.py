from django.urls import path
from .views import (
    SignupView,
    LoginView,
    UserProfileView,
    AdminUserListView,
    ToggleUserStatusView
)

urlpatterns = [
    path('signup/', SignupView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', UserProfileView.as_view()),
    path('admin/users/', AdminUserListView.as_view()),
    path('admin/users/<int:user_id>/toggle/', ToggleUserStatusView.as_view()),
]
