import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.db import transaction
from rest_framework.settings import api_settings
from django.contrib.auth.models import User
from api.models import Producto
from api.serializers import ProductoSerializer, ProductoReadSerializer
from api.permission import IsFree


class ProductoViewset(viewsets.ModelViewSet):

    queryset = Producto.objects.filter(activo=True)
    permission_classes = (IsFree,)
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", )
    search_fields = ("nombre", )
    ordering_fields = ("nombre",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ProductoSerializer
        else:
            return ProductoReadSerializer
    '''
        def get_permissions(self):
            """" Define permisos para este recurso """
            if self.action == "create" or self.action == "token":
                permission_classes = [AllowAny]
            else:
                permission_classes = [IsAuthenticated]
            return [permission() for permission in permission_classes]
    '''

    def create(self, request):
            try:
                data = request.data
                with transaction.atomic():
                    serializer = ProductoReadSerializer(data=data)
                    if serializer.is_valid():
                        userid = request.user.id
                        vendedor = User.objects.get(pk=userid)
                        Producto.objects.create (
                            vendedor = vendedor,
                            nombre = data.get("nombre"),
                            precio = data.get("precio")
                        )
                        return Response(data, status=status.HTTP_200_OK)
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update (self, request, pk):
        try:
            print("pk", pk)
            data = request.data
            with transaction.atomic():
                
                serializer = ProductoReadSerializer(data=data)
                if serializer.is_valid():
                    producto = Producto.objects.get(pk=pk)
                    userid = request.user.id
                    vendedor = User.objects.get(pk=userid)
                    
                    producto.vendedor = vendedor
                    producto.nombre = data.get("nombre")
                    producto.precio = data.get("precio")
                    producto.save()

                    return Response(data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

  
    def destroy(self, request, pk):
        try:
            
            productos = Producto.objects.get(pk = pk)
            productos.delete(Producto.objects.update(activo=False))

            
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)