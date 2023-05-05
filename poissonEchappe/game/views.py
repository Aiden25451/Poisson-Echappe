from django.shortcuts import render, redirect
from django.urls import path
from home.models import Score


# Create your views here.
def game(request):
    context = {"name": "", "time": "DNF"}
    if request.method == "POST":
        try:
            # repeat = False

            time = request.POST["best_time"]
            name = request.POST["name"]
            
            time = round(float(time))

            # for score in Score.objects.all():
            #     if(name == score.name):
            #         repeat = True

            # if(repeat):
            #     context["name"] = name
            #     context["time"] = time
            # else:
            score = Score()
            score.name = name
            score.time = time
            score.save()
            return redirect('../../home')
            
        except Exception as e:
            print(f"The error is {e}")

    
    return render(request, 'game/game.html', context)

def _return(request):
    return redirect('../../home')
    