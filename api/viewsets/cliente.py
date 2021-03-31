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
from api.models import Cliente
from api.serializers import ClienteSerializer, ClienteReadSerializer
from api.permission import IsFree


class ClienteViewset(viewsets.ModelViewSet):

    queryset = Cliente.objects.all()
    permission_classes = (IsFree,)
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", )
    search_fields = ("nombre", )
    ordering_fields = ("nombre",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ClienteSerializer
        else:
            return ClienteReadSerializer