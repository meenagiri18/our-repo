from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.http import JsonResponse
import json
from .models import *
from .algorithm import *
from django.views.decorators.csrf import csrf_exempt



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

        if password != password2:
            return JsonResponse({'success': False, 'error': 'Passwords do not match'})
        if len(password)<8:
            return JsonResponse({'success':False, 'error3':'Password must be of 8 characters'})

        if User.objects.filter(username=email).exists():
            return JsonResponse({'success': False, 'error1': 'Email already exists'})

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
    

def shipment(request):
    if request.method == 'POST':
        goods = request.POST.get('goods')
        weight = float(request.POST.get('weight'))
        package = request.POST.get('package')
        shipping_cost = request.POST.get('number2')

        sender_name = request.POST.get('sender')
        sender_address = request.POST.get('address')
        email = request.POST.get('email')
        phone_number = request.POST.get('number')

        receiver_name = request.POST.get('receiver')
        receiver_address = request.POST.get('address1')
        email = request.POST.get('email1')
        phone_number = request.POST.get('number1')
        
        
        shipping = Shipment(goods=goods,weight=weight,package=package,shipping_cost=shipping_cost,sender_name=sender_name, sender_address=sender_address,email=email,phone_number=phone_number,receiver_name=receiver_name,receiver_address=receiver_address)
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

                return JsonResponse({'shortestPath': shortest_distance, 'path': path})
            
def route_api(request):
    routeTracking = RouteResult.objects.all().values()
    paths = list(routeTracking)
    return JsonResponse(paths,safe=False)


# def track_parcel(request, tracking_number):
#     shipment = Shipment.objects.get(tracking_number=tracking_number)
    
#     # Get locations
#     locations = Location.objects.all()
#     distances = Distance.objects.all()
    
#     # Compute shortest paths
#     dist_matrix = floyd_warshall(locations, distances)
    
#     # Get location indices
#     location_index = {location.name: idx for idx, location in enumerate(locations)}
    
#     current_location = shipment.current_location
#     receiver_address = shipment.receiver_address
    
#     # Find shortest path
#     if current_location in location_index and receiver_address in location_index:
#         i = location_index[current_location]
#         j = location_index[receiver_address]
#         shortest_distance = dist_matrix[i, j]
        
#         response = {
#             'success': True,
#             'shortest_distance': shortest_distance
#         }
#     else:
#         response = {
#             'success': False,
#             'error': 'Invalid locations',
#             'current_location': current_location,
#             'receiver_address': receiver_address,
#             'valid_locations': list(location_index.keys())
#         }
    
#     return JsonResponse(response)

# # track bhanney view
# def track(request):
#     if request.method == 'POST':
#         tracking_number = request.POST.get('tracking_number')
#         if tracking_number == Shipment.objects.get(tracking_number):
#             return redirect('/')
 
#     # tracking = track(tracking_number)



