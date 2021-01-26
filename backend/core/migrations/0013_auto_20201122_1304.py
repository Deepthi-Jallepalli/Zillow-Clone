# Generated by Django 3.1.2 on 2020-11-22 21:04

import core.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_auto_20201122_1158'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.ForeignKey(default=core.models.User.get_default_role, on_delete=django.db.models.deletion.CASCADE, to='core.role'),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_status',
            field=models.ForeignKey(default=core.models.User.get_default_user_status, on_delete=django.db.models.deletion.CASCADE, to='core.userstatus'),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_type',
            field=models.ForeignKey(default=core.models.User.get_default_user_type, on_delete=django.db.models.deletion.CASCADE, to='core.usertype'),
        ),
    ]