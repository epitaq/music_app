from django.http import HttpResponse
from django.template import loader

from musicapp.models import MusicList



def index(request):
    template = loader.get_template('musicapp/index.html')
    music_list = MusicList.objects
    #getの確認＋dbを叩く
    # 部分的な一致を検索
    if 'name' in request.GET:
        music_list = music_list.filter(name__contains=request.GET['name'])
    if 'title' in request.GET:
        music_list = music_list.filter(title__contains=request.GET['title'])
    #dataを渡す
    music_data = list(music_list.values())
    context = {
        "data": music_data
    }
    return HttpResponse(template.render(context, request))