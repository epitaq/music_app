from django.db import models

# Create your models here.

class MusicList(models.Model) :
    # id = models.CharField(max_length=20) #ユニークなID 
    movie = models.CharField(max_length=11) #動画ID
    name = models.CharField(max_length=20) #歌った人
    title = models.CharField(max_length=50) #歌名
    start = models.IntegerField() #スタートの時間(s)
    end = models.IntegerField() #終わりの時間(s)
    def __str__(self):
        return self.title
