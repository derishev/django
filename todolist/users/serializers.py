from rest_framework import serializers

from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('url', 'username', 'first_name', 'last_name', 'email',)


class CustomUserAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('url', 'username', 'first_name', 'last_name', 'email',
                  'is_superuser', 'is_staff')