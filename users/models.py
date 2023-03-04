from django.contrib.auth.models import AbstractUser
from django.db import models
from uuid import uuid4


class CustomUser(AbstractUser):
    """Model for API User"""
    uid = models.UUIDField(primary_key=True, default=uuid4)
    email = models.EmailField(unique=True)

    class Meta:
        verbose_name = 'пользователя'
        verbose_name_plural = 'пользователи'
        ordering = ('-date_joined',)
