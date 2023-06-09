# Generated by Django 3.2.5 on 2023-04-04 15:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('EatApi', '0008_remove_user_active'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderdetail',
            name='menu',
        ),
        migrations.AddField(
            model_name='orderdetail',
            name='dish',
            field=models.ForeignKey(default=True, on_delete=django.db.models.deletion.CASCADE, to='EatApi.dish'),
        ),
        migrations.CreateModel(
            name='Action',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('type', models.PositiveSmallIntegerField(choices=[(0, 'like'), (1, 'haha'), (2, 'heart')], default=0)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('dish', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='EatApi.dish')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
