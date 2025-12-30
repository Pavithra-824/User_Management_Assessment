from django.urls import path
from .views import SignupView, LoginView, ProfileView # Ensure ProfileView is imported

urlpatterns = [
    path('signup/', SignupView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', ProfileView.as_view()), # Fixes the 404
    path('profile/update/', ProfileView.as_view()), # Matches your frontend call
]