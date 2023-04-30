from django.urls import path
from . import views

urlpatterns = [
     path('', views.game, name="game"),
     path('return/', views._return, name="_return"),
]
