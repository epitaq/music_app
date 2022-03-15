from django.http import HttpResponse
from django.template import loader

from musicapp.models import MusicList



def index(request):
    template = loader.get_template('musicapp/index.html')
    music_data1 = [
        {
            "id": "bQBHMPmgX8w-9:20",
            "movie": "bQBHMPmgX8w",
            "name": "ときのそら",
            "title": "KumoHurray!",
            "start": 560,
            "end": 744
        },
        {
            "id": "bQBHMPmgX8w-53:46",
            "movie": "bQBHMPmgX8w",
            "name": "ときのそら",
            "title": "花時の空",
            "start": 3226,
            "end": 3563
        },
        {
            "id": "3YfI8tPsfS4-12:02",
            "movie": "3YfI8tPsfS4",
            "name": "ときのそら",
            "title": "Step and Go!!",
            "start": 722,
            "end": 980
        },]
    music_data = list(MusicList.objects.all().values())
    context = {
        "data": music_data
    }
    return HttpResponse(template.render(context, request))