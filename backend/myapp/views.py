from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.http import JsonResponse
# import random
# import string
# import json
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Shipment, Route
from .serializers import ShipmentSerializer
from .utils import floyd_warshall




# Create your views here.
def index(request):
    return render(request,'index.html')

def mainpage(request):
    return render(request,'mainpage')

def shipment(request):
    return render(request,'shipment')




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


class ShipmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer

    def retrieve(self, request, *args, **kwargs):
        shipment = self.get_object()
        dist_matrix, index, locations = floyd_warshall()
        
        start_index = index.get(shipment.current_location)
        end_index = index.get(shipment.destination)
        
        if start_index is not None and end_index is not None:
            shortest_distance = dist_matrix[start_index, end_index]
        else:
            shortest_distance = None

        serializer = self.get_serializer(shipment)
        return Response({
            'shipment': serializer.data,
            'shortest_distance': shortest_distance
        })