from rest_framework.serializers import HyperlinkedModelSerializer, StringRelatedField

from users.serializers import CustomUserModelSerializer
from .models import Project, ToDo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'

    def create(self, validated_data):
        project_obj = super().create(validated_data)
        project_obj.users.add(self.context.get('user'))
        return project_obj


class ToDoModelSerializer(HyperlinkedModelSerializer):
    author = CustomUserModelSerializer(read_only=True)

    class Meta:
        model = ToDo
        exclude = ('is_active',)

    def create(self, validated_data):
        validated_data['author'] = self.context.get('user')
        return super().create(validated_data)