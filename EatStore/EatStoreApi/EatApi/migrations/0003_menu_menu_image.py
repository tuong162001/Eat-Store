# Generated by Django 3.2.5 on 2023-03-27 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EatApi', '0002_auto_20230327_2122'),
    ]

    operations = [
        migrations.AddField(
            model_name='menu',
            name='menu_image',
            field=models.ImageField(default=None, upload_to='menu/%Y/%m'),
        ),
    ]