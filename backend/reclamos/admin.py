from django.contrib import admin
from .models import Reclamo

@admin.register(Reclamo)
class ReclamoAdmin(admin.ModelAdmin):
    list_display = ('producto', 'usuario', 'resuelto', 'fecha_creacion')
    list_filter = ('resuelto', 'usuario__tipo_usuario')
    search_fields = ('producto__nombre', 'descripcion')