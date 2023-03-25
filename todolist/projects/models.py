from django.contrib.auth import get_user_model
from django.db import models


class Project(models.Model):
    """Model for the project"""
    name = models.CharField(max_length=128, verbose_name='the name of the project')
    href = models.URLField(verbose_name='link to repository')
    users = models.ManyToManyField(get_user_model())

    class Meta:
        ordering = ('-pk',)

    def __str__(self):
        return f'{self.name}'


class ToDo(models.Model):
    """Model for project notes"""
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField(blank=True, verbose_name='note text')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='created')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='updated')
    author = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='todos',
    )
    is_active = models.BooleanField(default=True, verbose_name='sign of note openness', db_index=True)

    class Meta:
        verbose_name = 'note'
        verbose_name_plural = 'notes'
        ordering = ('-pk',)
