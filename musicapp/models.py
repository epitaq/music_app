# モデルの更新をする場合
# https://qiita.com/9bo0218/items/8d36b2307ba17fd71b95
# https://zerofromlight.com/blogs/detail/61/
# python manage.py makemigrations
# python manage.py migrate

from shelve import DbfilenameShelf
from sqlite3 import dbapi2
from django import db
from django.db import models

# Create your models here.

# タグのdb
class Tag(models.Model):
    type = models.CharField(max_length=100)
    def __str__(self):
        return self.type

# 歌のdb
class MusicList(models.Model) :
    movie = models.CharField(max_length=11) #動画ID
    name = models.CharField(max_length=200) #歌った人
    title = models.CharField(max_length=200) #歌名
    start = models.IntegerField() #スタートの時間(s)
    end = models.IntegerField() #終わりの時間(s)
    keeping = models.ManyToManyField(Tag) #タグつけ
    def __str__(self):
        return self.title




