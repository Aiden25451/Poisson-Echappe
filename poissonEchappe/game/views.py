from django.urls import reverse_lazy
from django.views.generic.edit import FormView
from home.models import Score
from .forms import ScoreForm


class GameView(FormView):
    template_name = "game/game.html"
    form_class = ScoreForm
    success_url = reverse_lazy("index")

    def form_valid(self, form):
        if form.is_valid():
            submission_name = form.cleaned_data["name"]
            submission_time = form.cleaned_data["time"]
            score = Score(
                name=submission_name,
                time=submission_time,
            )
            score.save()

        return super().form_valid(form)
