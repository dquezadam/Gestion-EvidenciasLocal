from rest_framework import serializers
from .models import Reclamo
from evidencias.serializers import ProductoSerializer, EvidenciaSerializer
from usuarios.serializers import UsuarioSerializer
from evidencias.models import Producto, Evidencia

class ReclamoSerializer(serializers.ModelSerializer):
    producto = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(), write_only=True, required=False
    )
    producto_detalle = ProductoSerializer(source='producto', read_only=True)
    evidencia = serializers.PrimaryKeyRelatedField(
        queryset=Evidencia.objects.all(), write_only=True, required=False
    )
    evidencia_obj = EvidenciaSerializer(source='evidencia', read_only=True)
    usuario = UsuarioSerializer(read_only=True)

    class Meta:
        model = Reclamo
        fields = '__all__'
        read_only_fields = ['usuario']  # <-- Quitar 'resuelto' para permitir actualizarlo

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['producto'] = rep.pop('producto_detalle')
        return rep