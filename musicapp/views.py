from django.http import HttpResponse
from django.template import loader

from .models import MusicList



def index(request):
    template = loader.get_template('musicapp/index.html')
    music_data = list(MusicList.objects.all().values())
    context = {
        "data": music_data
    }
    return HttpResponse(template.render(context, request))