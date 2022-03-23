# Generated by Django 4.0.3 on 2022-03-23 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicapp', '0004_tag_musiclist_keeping'),
    ]

    operations = [
        migrations.CreateModel(
            name='test',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('movie', models.CharField(max_length=11)),
                ('name', models.CharField(max_length=200)),
                ('title', models.CharField(max_length=200)),
                ('start', models.IntegerField()),
                ('end', models.IntegerField()),
                ('keeping', models.ManyToManyField(to='musicapp.tag')),
            ],
        ),
    ]
