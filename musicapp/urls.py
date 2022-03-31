from django.urls import path

from . import views

urlpatterns = [
    # ex: /polls/
    path('', views.home, name='home'),
    path('home/', views.home, name='home'),
    path('player/', views.player, name='player'),
]