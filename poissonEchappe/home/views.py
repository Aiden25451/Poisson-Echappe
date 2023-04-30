from django.shortcuts import render, redirect
from .models import Score

# Create your views here.
def index(request):
    best_times = Score.objects.order_by('time')[:10]
    context={"times" : best_times}
    return render(request, 'home/index.html', context)

def game(request):
    return redirect('../../game')