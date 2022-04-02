from ast import And
from django.shortcuts import render
from django.db.models import Q
from .models import *
import random


def home(request):
    # libList
    libList = []
    href_type = []
    associate_tag = AssociateTag.objects.all()
    for ass in associate_tag:
        q = Q()
        que = ''
        for asskv in ass.keeping.values():
            q.add(Q(keeping__type=asskv['type']), Q.OR)
            que += '+' + str(asskv['type'])
        # 条件から三つランダムで取得
        randomMusicList3 = MusicList.objects.filter(q).order_by('?')[:3]
        libList.append({'url':que[1:], 'photo':[music.movie for music in randomMusicList3], 'title':ass.title, 'comment':ass.comment})
    print(libList)
    # videoList
    videoList = list(MusicList.objects.all().values())
    random_videoList = random.sample(videoList, len(videoList))
    context = {
        'libList' : libList,
        'videoList' : random_videoList
    }
    return render(request, 'musicapp/home.html', context)

def player(request):
    music_list = MusicList.objects
    #getの確認＋dbを叩く
    print(request.GET.get)
    # タグの一覧
    tag = [type['type'] for type in Tag.objects.all().values()]
    # タイプの選択 OR検索
    if 'type' in request.GET:
        q =Q()
        get_type = request.GET.getlist('type')
        get_type = sum([i.split(' ') for i in get_type], [])
        print(get_type)
        for i in get_type:
            if i in tag:
                q.add(Q(keeping__type=i), Q.OR)
        print('type,Q')
        print(q)
        music_list = music_list.filter(q)
    # タイトルと名前を一緒に検索 AND検索
    if 'q' in request.GET:
        q = Q()
        search = request.GET['q'].replace('\u3000', ' ')
        search = search.split(' ')
        for key in search:
            # タイトルと名前はOR、複数の検索ワードはAND,tagはAND
            if key in tag:
                # q.add(Q(keeping=Tag.objects.get(type = key)), Q.AND)
                music_list = music_list.filter(keeping__type=key)
            else:
                q.add(Q(Q(title__icontains=key) | Q(name__icontains=key)) , Q.AND)
        print('q,Q')
        print(q)
        music_list = music_list.filter(q)
    #dataを渡す
    music_data = list(music_list.order_by('?').values())
    context = {
        'data': music_data,
        'keeping': [type['type'] for type in Tag.objects.all().values()]
    }
    return render(request, 'musicapp/player.html', context)

def clip(request):
    context = {}
    return render(request, 'musicapp/clip.html', context)