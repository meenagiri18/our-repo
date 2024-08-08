from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.http import HttpResponse,JsonResponse


# Create your views here.
def index(request):
    return render(request,'index.html')

def mainpage(request):
     return HttpResponse('This is the main page...')


def signup(request):
    if request.method== 'POST':
        email= request.POST['email']
        password= request.POST['password']
        password2= request.POST['password2']


        if password == password2:
            if User.objects.filter(email=email).exists():
                messages.info(request, 'Email already used')
                return redirect('signup')
            
        
            else:
                user = User.objects.create_user(username=email,password=password)
                return redirect('/login')
            
        else:
            messages.infp(request, 'Password not same')
            return redirect('signup')   
                
    else:
        return render(request, 'signup')




def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = auth.authenticate(username=email, password=password)

        if user is not None:
            auth.login(request,user)
            return redirect('/mainpage')
        else:
            data={
                'error':'invalid'
            }
            return JsonResponse(data)
           
          
    else:
            return redirect( '/login')
    


def go(request):
    data={
        'error':'invalid'
    }
    return JsonResponse(data)
       


   
   