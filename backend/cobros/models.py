# cobros/models.py
from django.db import models
from evidencias.models import Evidencia

class Cobro(models.Model):
    evidencia = models.ForeignKey(Evidencia, on_delete=models.CASCADE)
    fecha_generado = models.DateTimeField(auto_now_add=True)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    pdf = models.FileField(upload_to='cobros/')