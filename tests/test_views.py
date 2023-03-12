from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status, test as rft
from mixer.backend.django import mixer

from projects.models import ToDo, Project
from projects.views import ToDoViewSet, ProjectViewSet
from users.views import CustomUserViewSet


# [!!!] Authentication via `APIClient` client is only valid
# if `authentication.SessionAuthentication` is enabled in `todolist/todolist/settings.py`

class TestUserViewSet(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.BASE_URL = '/api/users/'  # When working with APIRequestFactory, the path is not important
        cls.data_user = dict(username='user', email='user@mail.com', password='user123456')
        cls.data_update_user = dict(username='newUser', email='newUser@mail.com')
        cls.data_admin = dict(username='admin', email='admin@mail.com', password='admin123')

    def setUp(self):
        self.factory = rft.APIRequestFactory()
        self.user = get_user_model().objects.create_user(**self.data_user)
        self.client = rft.APIClient()
        self.admin = get_user_model().objects.create_superuser(**self.data_admin)

    def test_existence_of_attributes(self):
        attributes = dir(CustomUserViewSet())
        self.assertNotIn('create', attributes)
        self.assertIn('list', attributes)
        self.assertIn('retrieve', attributes)
        self.assertIn('update', attributes)
        self.assertNotIn('destroy', attributes)

    def test_get_list_guest(self):
        request = self.factory.get(self.BASE_URL)
        view = CustomUserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_list_auth(self):
        request = self.factory.get(self.BASE_URL)
        rft.force_authenticate(request, user=self.user)
        view = CustomUserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_item_guest(self):
        request = self.factory.get(f'{self.BASE_URL}{self.user.pk}/')
        view = CustomUserViewSet.as_view({'get': 'retrieve'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_item_auth(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'{self.BASE_URL}{self.user.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_patch_guest(self):
        response = self.client.patch(f'{self.BASE_URL}{self.user.pk}/', data=self.data_user)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_patch_auth(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(f'{self.BASE_URL}{self.user.pk}/', data=self.data_update_user)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_patch_admin(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.patch(f'{self.BASE_URL}{self.user.pk}/', data=self.data_update_user)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.username, self.data_update_user['username'])
        self.assertEqual(self.user.email, self.data_update_user['email'])

    @classmethod
    def tearDownClass(cls):
        pass


class TestProjectViewSet(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.BASE_URL = '/api/projects/'  # When working with APIRequestFactory, the path is not important
        cls.data_user = dict(username='user', email='user@mail.com', password='user123456')
        cls.data_admin = dict(username='admin', email='admin@mail.com', password='admin123')

    def setUp(self):
        self.factory = rft.APIRequestFactory()
        self.user = get_user_model().objects.create_user(**self.data_user)
        self.admin = get_user_model().objects.create_superuser(**self.data_admin)
        self.data_project = {'name': 'project_1', 'href': 'https://github.com/', 'users': [self.user.pk, self.admin.pk]}

    def test_existence_of_attributes(self):
        attributes = dir(ProjectViewSet())
        self.assertIn('create', attributes)
        self.assertIn('list', attributes)
        self.assertIn('retrieve', attributes)
        self.assertIn('update', attributes)
        self.assertIn('destroy', attributes)

    def test_get_list_guest(self):
        request = self.factory.get(self.BASE_URL)
        view = CustomUserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_list_auth(self):
        request = self.factory.get(self.BASE_URL)
        rft.force_authenticate(request, user=self.user)
        view = CustomUserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_admin(self):
        data = {
            'name': 'project_1',
            'href': 'https://github.com/',
            'users': [self.admin, self.user]
        }
        self.client.login(username=self.data_admin.get('username'), password=self.data_admin.get('password'))
        response = self.client.post(f'{self.BASE_URL}', data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    @classmethod
    def tearDownClass(cls):
        pass


class TestTodoViewSet(rft.APITestCase):
    @classmethod
    def setUpClass(cls):
        cls.BASE_URL = '/api/todos/'
        cls.data_user = dict(username='user', email='user@mail.com', password='user123456')
        cls.data_admin = dict(username='admin', email='admin@mail.com', password='admin123')

    def setUp(self):
        self.user = get_user_model().objects.create_user(**self.data_user)
        self.admin = get_user_model().objects.create_superuser(**self.data_admin)
        self.todo = mixer.blend(ToDo)

    def test_existence_of_attributes(self):
        attributes = dir(ToDoViewSet())
        self.assertIn('create', attributes)
        self.assertIn('list', attributes)
        self.assertIn('retrieve', attributes)
        self.assertIn('update', attributes)
        self.assertIn('destroy', attributes)

    def test_get_list_guest(self):
        response = self.client.get(f'{self.BASE_URL}')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_list_auth(self):
        self.client.login(username=self.data_user.get('username'), password=self.data_user.get('password'))
        response = self.client.get(f'{self.BASE_URL}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_item_guest(self):
        response = self.client.get(f'{self.BASE_URL}{self.todo.pk}/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_item_auth(self):
        self.client.login(username=self.data_user.get('username'), password=self.data_user.get('password'))
        response = self.client.get(f'{self.BASE_URL}{self.todo.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_patch_guest(self):
        response = self.client.patch(f'{self.BASE_URL}{self.todo.pk}/', data={'text': 'Some text'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_patch_auth(self):
        self.client.login(username=self.data_user.get('username'), password=self.data_user.get('password'))
        response = self.client.patch(f'{self.BASE_URL}{self.todo.pk}/', data={'text': 'Some text'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_patch_admin(self):
        data = {'text': 'Text new'}
        self.client.login(username=self.data_admin.get('username'), password=self.data_admin.get('password'))
        response = self.client.patch(f'{self.BASE_URL}{self.todo.pk}/', data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo.refresh_from_db()
        self.assertEqual(self.todo.text, data.get('text'))

    def test_post_auth(self):
        project = mixer.blend(Project)
        data = {
            'text': 'Some text 0',
            'project': project.pk
        }
        self.client.login(username=self.data_user.get('username'), password=self.data_user.get('password'))
        response = self.client.post(f'{self.BASE_URL}', data=data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_admin(self):
        project = mixer.blend(Project)
        data = {
            'text': 'Some text 1',
            'project': project.pk
        }
        self.client.login(username=self.data_admin.get('username'), password=self.data_admin.get('password'))
        response = self.client.post(f'{self.BASE_URL}', data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    @classmethod
    def tearDownClass(cls):
        pass