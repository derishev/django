import graphene
from django.contrib.auth import get_user_model
from django.core.exceptions import FieldError
from django.db.models import Q
from graphene_django import DjangoObjectType

from projects.models import Project, ToDo


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


# -----------------------------------------------------------------------------
def get_object_by_field(model, **kwargs):
    try:
        return model.objects.get(**kwargs)
    except model.DoesNotExist:
        return None


def camelcase_to_snake_case(word: str) -> str:
    result = ''
    for char in word:
        if char.isupper():
            result += f'_{char.lower()}'
        else:
            result += char
    return result


def get_objects_order_by(model, order):
    if order is None:
        return model.objects.all()

    order = camelcase_to_snake_case(order)
    try:
        return model.objects.all().order_by(order)
    except FieldError:
        return None


# -----------------------------------------------------------------------------
class Query(graphene.ObjectType):
    get_projects = graphene.List(ProjectType, order=graphene.String())
    get_todos = graphene.List(ToDoType, order=graphene.String())
    get_users = graphene.List(UserType, order=graphene.String())
    get_project_by_pk = graphene.Field(ProjectType, pk=graphene.Int(required=True))
    get_todo_by_pk = graphene.Field(ToDoType, pk=graphene.Int(required=True))
    get_user_by_pk = graphene.Field(UserType, pk=graphene.String(required=True))
    search_project_by_name = graphene.List(ProjectType, name=graphene.String(required=True))
    search_todo_by_project = graphene.List(ToDoType, name=graphene.String(required=True))
    search_user_by_name = graphene.List(UserType, name=graphene.String(required=True))

    def resolve_get_projects(self, info, order=None):
        return get_objects_order_by(model=Project, order=order)

    def resolve_get_todos(self, info, order=None):
        return get_objects_order_by(model=ToDo, order=order)

    def resolve_get_users(self, info, order=None):
        return get_objects_order_by(model=get_user_model(), order=order)

    def resolve_get_project_by_pk(self, info, pk):
        return get_object_by_field(Project, pk=pk)

    def resolve_get_todo_by_pk(self, info, pk):
        return get_object_by_field(ToDo, pk=pk)

    def resolve_get_user_by_pk(self, info, pk):
        return get_object_by_field(get_user_model(), pk=pk)

    def resolve_search_project_by_name(self, info, name):
        return Project.objects.filter(name__contains=name)

    def resolve_search_todo_by_project(self, info, name):
        return ToDo.objects.filter(project__name__contains=name)

    def resolve_search_user_by_name(self, info, name):
        return get_user_model().objects.filter(Q(first_name__contains=name))


# -----------------------------------------------------------------------------
class UserMutation(graphene.Mutation):
    class Arguments:
        pk = graphene.ID()
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, pk, first_name, last_name):
        user = get_user_model().objects.get(pk=pk)
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        return UserMutation(user=user)


class ProjectMutation(graphene.Mutation):
    class Arguments:
        pk = graphene.ID()
        name = graphene.String(required=True)
        href = graphene.String(required=True)

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, pk, name, href):
        project = Project.objects.get(pk=pk)
        project.name = name
        project.href = href
        project.save()
        return ProjectMutation(project=project)


class ToDoMutation(graphene.Mutation):
    class Arguments:
        pk = graphene.ID()
        text = graphene.String(required=True)

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, pk, text):
        todo = ToDo.objects.get(pk=pk)
        todo.text = text
        todo.save()
        return ToDoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_project = ProjectMutation.Field()
    update_user = UserMutation.Field()
    update_todo = ToDoMutation.Field()


# -----------------------------------------------------------------------------
schema = graphene.Schema(query=Query, mutation=Mutation)