
from django.shortcuts import render
from .models import MusicList
from django.http import Http404
from django.shortcuts import render

def index(request):
    latest_MusicList_list = MusicList.objects.order_by('title')[:5]
    context = {
        'latest_question_list': latest_MusicList_list,
    }
    return render(request, 'player/index.html', context)

