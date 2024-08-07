from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.http import HttpResponse


# Create your views here.
def index(request):
    return render(request,'index.html')



# def register(request):
#     if request.method== 'POST':
#         username= request.POST['username']
#         email= request.POST['email']
#         password= request.POST['password']
#         password2= request.POST['password2']


#         if password == password2:
#             if User.objects.filter(email=email).exists():
#                 messages.info(request, 'Email already used')
#                 return redirect('register')
            
#             elif User.objects.filter(username=username).exists():
#                 messages.info(request, 'Username already used')
#                 return redirect('register')
            
#             else:
#                 user = User.objects.create_user(username=username, email=email, password=password)
#                 user.save()
#                 return redirect('login')
            
#         else:
#             messages.infp(request, 'Password not same')
    #         return redirect('register')   
                
    # else:
    #     return render(request, 'register.html')




def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = auth.authenticate(username=email, password=password)

        if user is not None:
            auth.login(request,user)
            return redirect('/mainpage')
        else:
            messages.info(request, 'Invalid credentials')
            return redirect( '/login')

          
    else:
            return redirect( '/login')
    
def mainpage(request):
     return HttpResponse('This is the main page...')


       


   
   