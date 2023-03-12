from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from uuid import uuid4


class CustomUser(AbstractUser):
    """Model for API User"""
    uid = models.UUIDField(primary_key=True, default=uuid4)
    email = models.EmailField(_('email address'), unique=True)

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
        ordering = ('-date_joined',)