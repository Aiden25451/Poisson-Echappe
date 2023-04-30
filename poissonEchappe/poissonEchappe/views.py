from django.shortcuts import redirect

def goHome(request):
    return redirect('home/')