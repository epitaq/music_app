from django.contrib import admin

from .models import MusicList

admin.site.register(MusicList)

from import_export import resources
from import_export.admin import ImportExportMixin

class UserResource(resources.ModelResource):
    class Meta:
        model = User

class UserAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = UserResource