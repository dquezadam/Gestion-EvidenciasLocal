from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'tipo_usuario', 'email', 'telefono']
        extra_kwargs = {'password': {'write_only': True}}  # Oculta la contraseña en las respuestas

    def create(self, validated_data):
        user = Usuario.objects.create_user(**validated_data)
        return user