from django.urls import path, include
from .views import TopScoresListView

urlpatterns = [
    path("", TopScoresListView.as_view(), name="index"),
    path("game/", include("game.urls")),
]
