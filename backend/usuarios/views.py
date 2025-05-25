# usuarios/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .models import Usuario
from .serializers import UsuarioSerializer

from rest_framework.authtoken.views import ObtainAuthToken, Token
from rest_framework.response import Response


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAdminUser]  # Solo accesible por administradores2

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'tipo_usuario': user.tipo_usuario  # Enviamos el rol a React
        })