# Generated by Django 2.2.13 on 2021-03-31 20:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20210331_1408'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='vendedor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='producto_vendedor', to=settings.AUTH_USER_MODEL),
        ),
    ]