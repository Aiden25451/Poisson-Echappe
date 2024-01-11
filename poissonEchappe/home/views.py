from django.views.generic import ListView
from .models import Score


class TopScoresListView(ListView):
    model = Score
    template_name = "home/index.html"
    context_object_name = "times"

    def get_queryset(self):
        # Get the 50 fastest times
        return Score.objects.order_by("time")[:50]
