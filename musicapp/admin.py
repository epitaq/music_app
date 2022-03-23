from django.contrib import admin
from import_export import resources
from import_export.admin import ImportMixin
from .models import *

class MusicListAdmin(ImportMixin,admin.ModelAdmin):
    # タグの選択方法
    # https://teratail.com/questions/280836
    filter_horizontal = ('keeping',)
    class MusicListResource(resources.ModelResource):
        class Meta:
            model = MusicList
            fields = ('id', 'movie', 'name', 'title', 'start', 'end')
    resource_class = MusicListResource

admin.site.register(MusicList,MusicListAdmin)

# タグ名
admin.site.register(Tag)

