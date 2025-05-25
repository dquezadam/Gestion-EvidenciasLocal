from rest_framework import permissions

class EsLogisticaClientes(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.tipo_usuario == "LOG_CL"