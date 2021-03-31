from django.db import models
from api.models import Producto


class Cliente(models.Model):

    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name="cliente_producto")
    nombre = models.TextField(max_length=30, null=True, blank=True)
    cantidad = models.IntegerField(null=True, blank=True, default=0)