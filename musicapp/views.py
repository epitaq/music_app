from django.shortcuts import render

from .models import *



def index(request):
    music_list = MusicList.objects
    #getの確認＋dbを叩く
    # 部分的な一致を検索
    print(request.GET.get)
    if 'name' in request.GET:
        music_list = music_list.filter(name__contains=request.GET['name'])
    if 'title' in request.GET:
        music_list = music_list.filter(title__contains=request.GET['title'])
    if 'type' in request.GET:
        music_list = music_list.filter(keeping=Tag.objects.get(type__contains=request.GET['type']))
    else:
        music_list = music_list.filter(keeping=Tag.objects.get(type__contains='切り抜き'))
    #dataを渡す
    music_data = list(music_list.values())
    context = {
        'data': music_data,
    }
    return render(request, 'musicapp/index.html', context)