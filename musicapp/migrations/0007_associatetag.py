# Generated by Django 4.0.3 on 2022-03-30 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicapp', '0006_delete_test'),
    ]

    operations = [
        migrations.CreateModel(
            name='AssociateTag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('comment', models.CharField(max_length=200)),
                ('keeping', models.ManyToManyField(to='musicapp.tag')),
            ],
        ),
    ]
