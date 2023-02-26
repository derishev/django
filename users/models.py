from django.contrib.auth.models import AbstractUser
from django.db import models
from uuid import uuid4


class CustomUser(AbstractUser):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f'{self.username} ({self.email})'

    class Meta:
        verbose_name = 'пользователя'
        verbose_name_plural = 'пользователи'