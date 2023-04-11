# Generated by Django 3.2.5 on 2023-03-30 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EatApi', '0003_menu_menu_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dish',
            name='menu',
        ),
        migrations.AddField(
            model_name='dish',
            name='menu',
            field=models.ManyToManyField(to='EatApi.Menu'),
        ),
    ]