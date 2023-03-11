from django.contrib.auth import get_user_model
from django.db import models


class Project(models.Model):
    """Model for the project"""
    name = models.CharField(max_length=128, verbose_name='НАЗВАНИЕ ПРОЕКТА')
    href = models.URLField(verbose_name='ССЫЛКА НА РЕПОЗИТОРИЙ')
    users = models.ManyToManyField(get_user_model())

    class Meta:
        verbose_name = 'проект'
        verbose_name_plural = 'проекты'
        ordering = ('-pk',)

    def __str__(self):
        return f'{self.name}'


class ToDo(models.Model):
    """Model for project notes"""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name='ПРОЕКТ')
    text = models.TextField(blank=True, verbose_name='ТЕКСТ ЗАМЕТКИ')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='СОЗДАНО')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='ОБНОВЛЕНО')
    author = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='todos',
        verbose_name='АВТОР'
    )
    is_active = models.BooleanField(default=True, verbose_name='ПРИЗНАК ОТКРЫТОСТИ', db_index=True)

    class Meta:
        verbose_name = 'заметку'
        verbose_name_plural = 'заметки'
        ordering = ('-pk',)