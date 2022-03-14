# Generated by Django 4.0.3 on 2022-03-13 08:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MusicList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('movie', models.CharField(max_length=11)),
                ('name', models.CharField(max_length=20)),
                ('title', models.CharField(max_length=50)),
                ('start', models.IntegerField()),
                ('end', models.IntegerField()),
            ],
        ),
    ]