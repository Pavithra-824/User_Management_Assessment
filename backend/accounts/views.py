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
        email = request.data.get("email") # Frontend sends email
        password = request.data.get("password")

        # Authenticate using email since that's what your frontend collects
        try:
            user_obj = User.objects.get(email=email)
            user = authenticate(username=user_obj.username, password=password)
        except User.DoesNotExist:
            user = None

        if not user:
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            "token": str(refresh.access_token),
            "user": {
                "username": user.username,
                "email": user.email,
                "role": user.role # Fixed: Required for frontend routing
            }
        })