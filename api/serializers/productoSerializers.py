from rest_framework import serializers
from api.models import Producto
from api.serializers import UserSerializer 


class ProductoSerializer(serializers.ModelSerializer):
    vendedor = UserSerializer(required=False) 
    class Meta:
        model = Producto
        fields = (
            'id',
            'nombre',
            'precio',
            'vendedor'
        )

        depth = 2


class ProductoReadSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Producto
        fields = (
            
            'nombre',
            'precio'
        )
