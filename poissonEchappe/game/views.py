from django.shortcuts import render, redirect
from django.urls import reverse

# from home.models import Score


# Create your views here.
def game(request):
    context = {"name": "", "time": "DNF"}

    # if request.method == "POST":
    # try:
    # repeat = False

    # time = request.POST["time"]
    # name = request.POST["name"]

    # times = time.split(":")

    # totalTime = 0
    # length = len(times)

    # if length == 2:
    #     totalTime += int(times[1])
    #     totalTime += int(times[0]) * 1000
    # else:
    #     return redirect("../../home")

    # score = Score()
    # score.name = name
    # score.time = totalTime
    # score.save()
    # return reverse("index")

    # except Exception as e:
    # print(f"The error is {e}")

    return render(request, "game/game.html", context)
