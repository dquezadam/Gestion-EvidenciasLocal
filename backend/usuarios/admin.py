from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario

class CustomUserAdmin(UserAdmin):
    model = Usuario
    list_display = ('username', 'email', 'tipo_usuario', 'telefono', 'is_staff')
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('tipo_usuario', 'telefono')}),
    )

admin.site.register(Usuario, CustomUserAdmin)