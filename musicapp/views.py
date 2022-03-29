from ast import And
from django.shortcuts import render
from django.db.models import Q
from .models import *
import random


def home(request):
    videoList = list(MusicList.objects.all().values())
    random_videoList = random.sample(videoList, len(videoList))
    context = {
        'videoList' : random_videoList
    }
    return render(request, 'musicapp/home.html', context)

def player(request):
    music_list = MusicList.objects
    #getの確認＋dbを叩く
    print(request.POST.get)
    # タグの一覧
    tag = [type['type'] for type in Tag.objects.all().values()]

    # タイプの選択 OR検索
    if 'type' in request.POST:
        q =Q()
        get_type = request.POST.getlist('type')
        for i in get_type:
            if i in tag:
                q.add(Q(keeping=Tag.objects.get(type = i)), Q.OR)
        print('type,Q')
        print(q)
        music_list = music_list.filter(q)

    # タイトルと名前を一緒に検索 AND検索
    if 'q' in request.POST:
        q = Q()
        search = request.POST['q'].replace('\u3000', ' ')
        search = search.split(' ')
        for key in search:
            # タイトルと名前はOR、複数の検索ワードはAND,tagはAND
            if key in tag:
                # q.add(Q(keeping=Tag.objects.get(type = key)), Q.AND)
                music_list = music_list.filter(keeping=Tag.objects.get(type = key))
            else:
                q.add(Q(Q(title__icontains=key) | Q(name__icontains=key)) , Q.AND)
        print('q,Q')
        print(q)
        music_list = music_list.filter(q)
    #dataを渡す
    music_data = list(music_list.values())
    context = {
        'data': music_data,
        'keeping': [type['type'] for type in Tag.objects.all().values()]
    }

    return render(request, 'musicapp/player.html', context)