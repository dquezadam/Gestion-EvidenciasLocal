from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    TIPOS_USUARIO = [
        ('OP_CD', 'Administrativo Operativo CD'),
        ('LOG_CL', 'Administrativo Logística Clientes'),
    ]
    
    tipo_usuario = models.CharField(
        max_length=6,
        choices=TIPOS_USUARIO,
        default='OP_CD'
    )
    telefono = models.CharField(max_length=20, blank=True)
    
    def __str__(self):
        return f"{self.username} ({self.get_tipo_usuario_display()})"