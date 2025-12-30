from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken



from django.contrib.auth import get_user_model
User = get_user_model()

class SignupView(APIView):
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        full_name = request.data.get("full_name") # Collect this

        if not all([username, email, password, full_name]):
            return Response({"error": "All fields required"}, status=400)

        user = User.objects.create_user(
            username=username, 
            email=email, 
            password=password, 
            full_name=full_name # Save this
        )
        return Response({"message": "User created"}, status=201)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"error": "Email and password are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Fix: Since USERNAME_FIELD is 'email', pass the email to authenticate
        user = authenticate(request, username=email, password=password)

        if not user:
            return Response(
                {"error": "Invalid credentials. Please check your email and password."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Ensure user is active
        if not user.is_active:
            return Response(
                {"error": "This account is inactive."},
                status=status.HTTP_401_UNAUTHORIZED
            )

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