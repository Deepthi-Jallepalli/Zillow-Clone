# Generated by Django 3.1.2 on 2020-11-24 11:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home_listing', '0005_remove_openhouse_scheduled_by'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='openhouse',
            name='description',
        ),
    ]
