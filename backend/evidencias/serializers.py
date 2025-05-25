from rest_framework import serializers
from .models import Producto, Evidencia
from usuarios.serializers import UsuarioSerializer

# evidencias/serializers.py
class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id','codigo', 'nombre', 'precio_unitario']

class EvidenciaSerializer(serializers.ModelSerializer):
    producto = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(), write_only=True
    )
    producto_detalle = ProductoSerializer(source='producto', read_only=True)
    usuario = UsuarioSerializer(read_only=True)

    class Meta:
        model = Evidencia
        fields = '__all__'
        read_only_fields = ['usuario']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        # Incluye el producto expandido y elimina el campo producto (ID) en la respuesta
        rep['producto'] = rep.pop('producto_detalle')
        return rep