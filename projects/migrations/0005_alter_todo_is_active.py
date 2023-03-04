from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0004_auto_20230304_0901'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='is_active',
            field=models.BooleanField(db_index=True, default=True, verbose_name='ПРИЗНАК ОТКРЫТОСТИ'),
        ),
    ]
