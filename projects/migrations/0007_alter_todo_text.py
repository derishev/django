from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0006_auto_20230304_1015'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='text',
            field=models.TextField(blank=True, verbose_name='ТЕКСТ ЗАМЕТКИ'),
        ),
    ]
