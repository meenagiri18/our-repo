from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.http import JsonResponse
import re
from .models import *
from .algorithm import *
from django.views.decorators.csrf import csrf_exempt
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError
from django.contrib.auth import logout






# Create your views here.
def index(request):
    return render(request,'index.html')

def mainpage(request):
    return render(request,'mainpage')



def signup(request):
    if request.method== 'POST':
        email= request.POST.get('email')
        password= request.POST.get('Password')
        password2= request.POST.get('password2')

        email_validator = EmailValidator()
        try:
            email_validator(email)
        except ValidationError:
            return JsonResponse({'success': False, 'error2': 'Invalid email format'})

        if password != password2:
            return JsonResponse({'success': False, 'error': 'Passwords do not match'})
        
        if User.objects.filter(username=email).exists():
            return JsonResponse({'success': False, 'error1': 'Email already exists'})
        
        pattern = r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
        if not re.match(pattern, password):
            return JsonResponse({
                'success': False, 
                'error3': 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
            })


        user = User.objects.create_user(username=email, password=password)
        user.save()
        return JsonResponse({'success': True, 'redirect': '/login'})
                
    else:
        return render(request, 'signup')




def login(request):
    if request.method == 'POST':
  
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = auth.authenticate(username=email, password=password)

        if user is not None:
            auth.login(request,user)
            return JsonResponse({'success':True,'redirect':'/mainpage'})
      
        else:
            return JsonResponse({'success':False,'error':'Invalid credentials'})

            
          
    else:
            return redirect( '/login')
def signout_view(request):
    logout(request)
    return redirect('/')  # Redirects to the root URL ("/")
   

def shipment(request):
    if request.method == 'POST':
        goods = request.POST.get('goods')
        weight = float(request.POST.get('weight'))
        package = request.POST.get('package')
        shipping_cost = float(request.POST.get('number2'))

        sender_name = request.POST.get('sender')
        sender_address = request.POST.get('address')
        email = request.POST.get('email')
        phone_number = request.POST.get('number')

        receiver_name = request.POST.get('receiver')
        receiver_address = request.POST.get('address1')
        email = request.POST.get('email1')
        phone_number = request.POST.get('number1')

        
        
        shipping = Shipment(goods=goods,weight=weight,package=package,shipping_cost=shipping_cost,sender_name=sender_name, sender_address=sender_address,email=email,phone_number=phone_number,receiver_name=receiver_name,receiver_address=receiver_address,is_approve=False)
        shipping.save()
        return redirect ('/mainpage')




@csrf_exempt
def route(request):
    if request.method == 'POST':
    
            flocation = request.POST.get('Flocation')
            tlocation = request.POST.get('Tlocation')
            if not flocation or not tlocation:
                return JsonResponse({'error': 'Missing locations'}, status=400)

            # Run Floyd-Warshall algorithm
            shortest_paths, next_node = floyd_warshall()

            if flocation in shortest_paths and tlocation in shortest_paths[flocation]:
                shortest_distance = shortest_paths[flocation][tlocation]
                path = construct_path(next_node, flocation, tlocation)

                # Save the result to the database
                RouteResult.objects.create(
                    flocation=flocation,
                    tlocation=tlocation,
                    shortest_distance=shortest_distance,
                    path=str(path)  # Store the path as a string or JSON if necessary
                )

                # return JsonResponse({'shortestPath': shortest_distance, 'path': path}) 
                return redirect("/shortest") 
            
def route_api(request):
    routeTracking = RouteResult.objects.all().values()
    paths = list(routeTracking)
    return JsonResponse(paths,safe=False)



def track(request):
    return redirect('/track')


def track_api(request):
    status = Shipment.objects.all().values()
    paths = list(status)
    return JsonResponse(paths,safe=False)


def trackingN_api(request,tracking_number):
    tracking_no = Shipment.objects.get(tracking_number=tracking_number)
    trackingg = {
                'tracking_number':tracking_no.tracking_number,
                'status':tracking_no.status,
                'current_location':tracking_no.current_location,
                'delivery_date':tracking_no.delivery_date,
            }
            
    return JsonResponse(trackingg,safe=False)

