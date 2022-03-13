from django.contrib import admin
from import_export import resources
from import_export.admin import ImportMixin
from .models import MusicList

class MusicListAdmin(ImportMixin,admin.ModelAdmin):
    class MusicListResource(resources.ModelResource):
        class Meta:
            model = MusicList
            fields = ('id', 'movie', 'name', 'title', 'start', 'end')
    resource_class = MusicListResource

admin.site.register(MusicList,MusicListAdmin)

