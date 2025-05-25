from django.db import models

class Producto(models.Model):
    codigo = models.CharField(max_length=50, unique=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"{self.codigo} - {self.nombre}"
    
def evidencia_upload_path(instance, filename):
    # Guarda los archivos en una carpeta por producto y usuario
    return f"evidencias/producto_{instance.producto.id}/usuario_{instance.usuario.id}/{filename}"

class Evidencia(models.Model):
    ESTADOS = [
        ('PEND', 'Pendiente'),
        ('APROB', 'Aprobado'),
        ('RECHAZ', 'Rechazado'),
    ]
    
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    usuario = models.ForeignKey('usuarios.Usuario', on_delete=models.CASCADE)
    archivo = models.FileField(upload_to=evidencia_upload_path)
    fecha_subida = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=6, choices=ESTADOS, default='PEND')
    observaciones = models.TextField(blank=True)
    
    def __str__(self):
        return f"Evidencia #{self.id} - {self.producto.nombre}"