from django.shortcuts import render

# from .models import Score


# Create your views here.
def index(request):
    best_times = {}
    # best_times = Score.objects.order_by("time")[:50]
    context = {"times": best_times}
    return render(request, "home/index.html", context)
