from django.urls import path
from .views import SignupView, LoginView, ProfileView # Added ProfileView

urlpatterns = [
    path('signup/', SignupView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', ProfileView.as_view()),        # Fixes 404
    path('profile/update/', ProfileView.as_view()), # Fixes 404
]