"""
todolist URL Configuration
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.authtoken import views
from rest_framework import permissions, schemas
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from projects.views import ProjectViewSet, ToDoViewSet
from users.views import CustomUserViewSet

# -----------------------------------------------------------------------------
router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'todos', ToDoViewSet)

schema_yasg_view = get_schema_view(
    openapi.Info(
        title='ToDo API',
        default_version='v1',
        description='API for organizing work on projects (for learning)',
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

schema_typical_view = schemas.get_schema_view(
    title='ToDo API',
    description="API for organizing work on projects (for learning)",
    version="v1"
)  # ToDo Delete after job verification
# -----------------------------------------------------------------------------
urlpatterns = [
    path('admin/', admin.site.urls),
    # ------------------------------
    path('api/auth/', include('rest_framework.urls')),
    path('api/token-auth/', views.obtain_auth_token),

    path('api/jwt-token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/jwt-token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # ------------------------------
    re_path('^api/', include(router.urls)),
    # ------------------------------
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_yasg_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^docs/$', schema_yasg_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_yasg_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    re_path(r'openapi$', schema_typical_view, name='openapi-schema'),
    re_path(r'manual/$', TemplateView.as_view(
        template_name='manual_redoc.html',
        extra_context={'schemaUrl': 'openapi-schema'}
    )),
]