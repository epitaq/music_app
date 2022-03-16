from django.shortcuts import render

from .models import MusicList



def index(request):
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
    return render(request, 'musicapp/index.html', context)