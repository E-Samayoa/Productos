# Generated by Django 2.2.13 on 2021-03-30 19:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_producto'),
    ]

    operations = [
        migrations.CreateModel(
            name='Curso',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom_curso', models.TextField(blank=True, max_length=20, null=True)),
            ],
        ),
    ]
