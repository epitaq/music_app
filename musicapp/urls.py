from django.urls import path

from . import views

urlpatterns = [
    # ex: /polls/
    path('', views.player, name='home'),
    path('player/', views.player, name='player'),
    path('home/', views.home, name='home'),
]