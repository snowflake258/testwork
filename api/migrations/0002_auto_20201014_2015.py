# Generated by Django 3.1.2 on 2020-10-14 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='account',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
