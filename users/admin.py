from django.contrib import admin

from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('uid', 'username', 'first_name', 'last_name', 'email', 'date_joined')
    list_display_links = ('uid', 'username', 'email')
    search_fields = ('uid', 'username', 'first_name', 'last_name', 'email')