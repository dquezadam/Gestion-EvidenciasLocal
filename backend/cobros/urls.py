# cobros/urls.py
from django.urls import path, include
from .views import generar_cobro_pdf

urlpatterns = [
    path('generar-cobro/<int:evidencia_id>/', generar_cobro_pdf, name='generar_cobro'),
]

