# Generated by Django 5.0.3 on 2024-03-20 11:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0006_alter_tokendata_access_token'),
    ]

    operations = [
        migrations.AddField(
            model_name='token',
            name='code',
            field=models.CharField(default='', max_length=64),
        ),
        migrations.AlterField(
            model_name='tokendata',
            name='access_token',
            field=models.JSONField(default=dict, verbose_name='TokenDetails'),
        ),
    ]
