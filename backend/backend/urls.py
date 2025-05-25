from django.contrib import admin    
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from usuarios.views import UsuarioViewSet 
from evidencias.views import ProductoViewSet, EvidenciaViewSet
from reclamos.views import ReclamoViewSet
from usuarios.views import CustomAuthToken
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')
router.register(r'productos', ProductoViewSet, basename='producto')
router.register(r'evidencias', EvidenciaViewSet , basename='evidencia')
router.register(r'reclamos', ReclamoViewSet , basename='reclamo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),  # Login en el navegador para pruebas
    path('api-token-auth/', CustomAuthToken.as_view()),  # Login
    path('api/cobros/', include('cobros.urls')),  # Nueva app de cobros 
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)