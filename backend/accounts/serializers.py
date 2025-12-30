from rest_framework import serializers
from django.contrib.auth import get_user_model
import re

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'full_name', 'password', 'role', 'is_active')
        read_only_fields = ('role', 'is_active')

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters.")
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Password must contain an uppercase letter.")
        if not re.search(r'[0-9]', value):
            raise serializers.ValidationError("Password must contain a number.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['email'],
            full_name=validated_data['full_name'],
            password=validated_data['password']
        )
        return user


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'full_name')
