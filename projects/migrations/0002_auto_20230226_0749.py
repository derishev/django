# Generated by Django 3.2 on 2023-02-26 07:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='project',
            options={'verbose_name': 'проект', 'verbose_name_plural': 'проекты'},
        ),
        migrations.AlterModelOptions(
            name='todo',
            options={'verbose_name': 'заметку', 'verbose_name_plural': 'заметки'},
        ),
    ]