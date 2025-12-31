from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class SignupView(APIView):
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        full_name = request.data.get("full_name")

        if not all([username, email, password, full_name]):
            return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            username=username, email=email, password=password, full_name=full_name
        )
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)

from rest_framework.permissions import IsAuthenticated

# ... (Keep your SignupView)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        # Because USERNAME_FIELD = 'email', authenticate expects email as 'username'
        user = authenticate(request, username=email, password=password)

        if not user:
            return Response({"error": "Invalid email or password"}, status=401)

        refresh = RefreshToken.for_user(user)
        return Response({
            "token": str(refresh.access_token),
            "user": {
                "username": user.username,
                "email": user.email,
                "role": user.role,
                "full_name": user.full_name
            }
        })

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "full_name": user.full_name,
            "email": user.email,
            "username": user.username,
            "role": user.role
        })

    def put(self, request):
        user = request.user
        user.full_name = request.data.get("full_name", user.full_name)
        user.save()
        return Response({"message": "Profile updated successfully"})