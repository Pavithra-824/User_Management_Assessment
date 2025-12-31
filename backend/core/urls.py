from django.urls import path
from accounts.views import SignupView, LoginView, ProfileView # Ensure ProfileView is imported

urlpatterns = [
    path('signup/', SignupView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', ProfileView.as_view()),        # This stops the 404 error
    path('profile/update/', ProfileView.as_view()), # Matches your frontend API call
]