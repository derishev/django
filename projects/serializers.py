from django.contrib.auth import get_user_model
from rest_framework import serializers

from users.serializers import CustomUserSerializer
from .models import Project, ToDo
from abc import ABC


class UserListingField(serializers.RelatedField, ABC):
    def to_representation(self, value):
        return f'{value.get_username()}'

    def to_internal_value(self, data):
        obj = get_user_model().objects.get(username=data)
        return obj


class ProjectSerializer(serializers.ModelSerializer):
    users = UserListingField(many=True, queryset=get_user_model().objects.all())

    class Meta:
        model = Project
        fields = '__all__'


class ToDoViewingSerializer(serializers.HyperlinkedModelSerializer):
    author = CustomUserSerializer(read_only=True)

    class Meta:
        model = ToDo
        fields = '__all__'


class ToDoSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())

    class Meta:
        model = ToDo
        fields = '__all__'