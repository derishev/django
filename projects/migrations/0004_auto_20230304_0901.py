
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0003_rename_user_todo_author'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='project',
            options={'ordering': ('pk',), 'verbose_name': 'проект', 'verbose_name_plural': 'проекты'},
        ),
        migrations.AlterModelOptions(
            name='todo',
            options={'ordering': ('pk',), 'verbose_name': 'заметку', 'verbose_name_plural': 'заметки'},
        ),
    ]
 