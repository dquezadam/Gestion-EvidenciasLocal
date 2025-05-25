# usuarios/permissions.py
from rest_framework import permissions

class EsLogisticaClientes(permissions.BasePermission):
    def has_permission(self, request, view):
        # Verifica si el usuario está autenticado y es de tipo LOG_CL
        return request.user.is_authenticated and request.user.tipo_usuario == "LOG_CL"