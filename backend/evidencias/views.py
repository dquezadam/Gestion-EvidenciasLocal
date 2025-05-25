from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from .models import Producto, Evidencia
from .serializers import ProductoSerializer, EvidenciaSerializer
from .permissions import EsLogisticaClientes  # Importa el permiso personalizado
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticated]  # Cualquier usuario autenticado puede ver productos


class EvidenciaViewSet(viewsets.ModelViewSet):
    queryset = Evidencia.objects.all()
    serializer_class = EvidenciaSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]  # <-- Agregar
    filterset_fields = ['estado']  # <-- Permite filtrar por estado

    def perform_create(self, serializer):
        # Asigna automáticamente el usuario autenticado
        serializer.save(usuario=self.request.user)

    def get_queryset(self):
        user = self.request.user
        queryset = Evidencia.objects.all()
        # Si es Operativo CD, solo ve sus evidencias
        if user.tipo_usuario == 'OP_CD':
            return queryset.filter(usuario=user)
        # Si es Logística Clientes, ve todas
        return queryset