from django.http import FileResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from reportlab.pdfgen import canvas
from io import BytesIO
from evidencias.models import Evidencia
from usuarios.permissions import EsLogisticaClientes  # Importación corregida
from rest_framework.response import Response    

@api_view(['GET'])
@permission_classes([IsAuthenticated, EsLogisticaClientes])  # Permisos actualizados
def generar_cobro_pdf(request, evidencia_id):
    try:
        evidencia = Evidencia.objects.get(id=evidencia_id, estado='APROB')
    except Evidencia.DoesNotExist:
        return Response({"error": "Evidencia no encontrada o no aprobada"}, status=404)

    # Crear PDF
    buffer = BytesIO()
    p = canvas.Canvas(buffer)

    # Contenido del PDF (personaliza según necesites)
    p.drawString(100, 800, f"Factura #{evidencia.id}")
    p.drawString(100, 780, f"Producto: {evidencia.producto.nombre}")
    p.drawString(100, 760, f"Monto: ${evidencia.producto.precio_unitario}")
    p.drawString(100, 740, f"Cliente: {evidencia.usuario.username}")

    p.showPage()
    p.save()

    buffer.seek(0)
    return FileResponse(buffer, as_attachment=True, filename=f"cobro_{evidencia.id}.pdf")