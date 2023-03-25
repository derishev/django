from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('email',)}),
    )   # Expanding the list of fields to display in the form

    list_display = ('uid', 'username', 'first_name', 'last_name', 'email', 'date_joined')
    list_display_links = ('uid', 'username', 'email')
    search_fields = ('uid', 'username', 'first_name', 'last_name', 'email')