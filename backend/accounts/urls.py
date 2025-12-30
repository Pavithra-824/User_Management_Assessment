from django.urls import path
from .views import LoginView, AdminDashboardView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('admin-dashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),
]