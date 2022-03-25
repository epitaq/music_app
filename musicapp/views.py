from ast import And
from django.shortcuts import render
from django.db.models import Q
from .models import *



def index(request):
    music_list = MusicList.objects
    #getの確認＋dbを叩く
    # 部分的な一致を検索
    print(request.GET.get)
    # タイプの選択
    if 'type' in request.GET:
        music_list = music_list.filter(keeping=Tag.objects.filter(type__contains=request.GET['type']))
    # タイトルと名前を一緒に検索
    if 'q' in request.GET:
        q = Q()
        search = request.GET['q'].replace('\u3000', ' ')
        search = search.split(' ')
        print(search)
        tag = [type['type'] for type in Tag.objects.all().values()]
        for key in search:
            # タイトルと名前はOR、複数の検索ワードはAND,tagはAND
            if key in tag:
                q.add(Q(keeping=Tag.objects.get(type = key)), Q.AND)
            else:
                q.add(Q(Q(title__icontains=key) | Q(name__icontains=key)) , Q.AND)
        music_list = music_list.filter(q)
    #dataを渡す
    music_data = list(music_list.values())
    context = {
        'data': music_data,
        'keeping': [type['type'] for type in Tag.objects.all().values()]
    }
    return render(request, 'musicapp/index.html', context)