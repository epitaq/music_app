from django.contrib import admin
from import_export import resources
from import_export.admin import ImportMixin
from import_export.admin import ImportExportModelAdmin
from .models import *

# ミュージックリスト
class MusicListAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    # タグの選択方法
    # https://teratail.com/questions/280836
    filter_horizontal = ('keeping',)
    class MusicListResource(resources.ModelResource):
        class Meta:
            model = MusicList
            fields = ('id', 'movie', 'name', 'title', 'start', 'end')
            export_order = ('id', 'movie', 'name', 'title', 'start', 'end')
    resource_class = MusicListResource
admin.site.register(MusicList,MusicListAdmin)

# タグ名
class TagAdmin (ImportExportModelAdmin):
    class TagResource(resources.ModelResource):
        class Meta:
            model = Tag
            fields = ('id','type')
            export_order = ('id','type')
    resource_class = TagResource
admin.site.register(Tag,TagAdmin)

# 再生ライブラリ
class AssociateTagAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    filter_horizontal = ('keeping',)
    class AssociateTagResource(resources.ModelResource):
        class Meta:
            model = AssociateTag
            fields = ('id','title','keeping','comment')
            export_order = ('id','title','keeping','comment')
    resource_class = AssociateTagResource
admin.site.register(AssociateTag,AssociateTagAdmin)

