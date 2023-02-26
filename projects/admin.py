from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Project, ToDo


@admin.register(Project)
class CustomUserAdmin(UserAdmin):
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('email',)}),
    )   # Expanding the list of fields to display in the form
    list_display = ('id', 'name', 'href',)
    list_display_links = ('id', 'name',)
    search_fields = ('name',)


@admin.register(ToDo)
class ToDoAdmin(admin.ModelAdmin):
    list_display = ('id', 'project', 'author', 'created_at', 'updated_at',)
    list_filter = ('created_at', 'updated_at',)
    search_fields = ('project',)