from django.db import models
from django.contrib.auth.models import User


class Producto(models.Model):

    vendedor = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name="producto_vendedor")
    nombre = models.TextField(max_length=30, null=True, blank=True)
    precio = models.DecimalField(max_digits=7, decimal_places=2)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.active = False
        self.save()
        return True
