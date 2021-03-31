from rest_framework import serializers
from api.models import Cliente
from api.serializers import ProductoSerializer


class ClienteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cliente
        fields = '__all__'

        depth = 2


class ClienteReadSerializer(serializers.ModelSerializer):

    producto = ProductoSerializer(required=False)
    
    class Meta:
        model = Cliente
        fields = (
            
            'nombre',
            'cantidad',
            'producto'
        )
