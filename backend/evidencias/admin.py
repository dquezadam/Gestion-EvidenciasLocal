from django.contrib import admin
from .models import Producto, Evidencia

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'nombre', 'precio_unitario')
    search_fields = ('codigo', 'nombre')

@admin.register(Evidencia)
class EvidenciaAdmin(admin.ModelAdmin):
    list_display = ('producto', 'usuario', 'estado', 'fecha_subida')
    list_filter = ('estado', 'usuario__tipo_usuario')
    search_fields = ('producto__nombre', 'usuario__username')