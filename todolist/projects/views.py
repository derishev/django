from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status

from .filters import ProjectFilter, ToDoFilter
from .models import Project, ToDo
from .pagination import ProjectLimitOffsetPagination, ToDoLimitOffsetPagination
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status

from .filters import ProjectFilter, ToDoFilter
from .models import Project, ToDo
from .pagination import ProjectLimitOffsetPagination, ToDoLimitOffsetPagination
from .serializers import ProjectSerializer, ToDoSerializer, ToDoViewingSerializer


class ProjectViewSet(ModelViewSet):
    """Controller for working with information **about project**"""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class ToDoViewSet(ModelViewSet):
    """Controller for working with information **about project notes**"""
    queryset = ToDo.objects.filter(is_active=True)
    pagination_class = ToDoLimitOffsetPagination
    filterset_class = ToDoFilter

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ToDoViewingSerializer
        return ToDoSerializer

    def destroy(self, request, *args, **kwargs):
        try:
            todo = self.get_object()
            todo.is_active = False
            todo.save()
        except (APIException, AttributeError):
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)