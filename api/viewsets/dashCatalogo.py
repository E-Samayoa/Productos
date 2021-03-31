import json

from django.core.files import File
from rest_framework.viewsets import GenericViewSet 
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.settings import api_settings
from api.models import Producto
from api.serializers import ProductoSerializer, UserReadSerializer, ProductoReadSerializer, UserSerializer
from django.db.models import Count
from api.permission import IsFree


class DashboardCatalogoView(GenericViewSet):
    queryset = User.objects.all()
    permission_classes = (IsFree,)
    @action(methods=["get"], detail=False)
    def infCatalogo(self, request):
        try:
            # Productos
            productos = Producto.objects.all().filter(activo=True)
        
            data = {
                'productos': ProductoSerializer(productos, many=True).data,
          
            }
            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
