from django.db import models

class Reclamo(models.Model):
    producto = models.ForeignKey('evidencias.Producto', on_delete=models.CASCADE)
    evidencia = models.ForeignKey('evidencias.Evidencia', on_delete=models.CASCADE, null=True, blank=True)
    usuario = models.ForeignKey('usuarios.Usuario', on_delete=models.CASCADE)
    descripcion = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    resuelto = models.BooleanField(default=False)
    fecha_resolucion = models.DateTimeField(null=True, blank=True)
    comentarios_resolucion = models.TextField(blank=True)
    
    def __str__(self):
        return f"Reclamo #{self.id} - {self.producto.nombre}"