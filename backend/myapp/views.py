from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.http import HttpResponse,JsonResponse
import random
import string
import json
from .models import Parcel,Tracking,Shipment
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required




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
    

def generate_tracking_number():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))

@csrf_exempt
def create_parcel(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            sender = data.get('sender_name')
            receiver = data.get('receiver_name')
            current_location = data.get('current_location')
            destination_location = data.get('destination_location')
           
            # Ensure all required fields are provided
            if not all([sender, receiver, current_location,destination_location]):
                return JsonResponse({"error": "Missing required fields"},status=400)
            
            # Validate that sender and receiver names are not integers
            # if not sender.isalpha() or not receiver.isalpha():
            #     return JsonResponse({"error": "Sender and receiver names must only contain letters."})
            
           
            # Generate tracking number
            tracking_number = generate_tracking_number()

            # Save the parcel to the database
            parcel = Parcel(sender=sender, receiver=receiver, current_location=current_location,destination_location=destination_location, tracking_number=tracking_number)
            parcel.clean()
            parcel.save()

            response_data = {
                "message": "Parcel created successfully!",
                "parcelid":parcel.parcelid,
                "tracking_number": tracking_number,
            }
            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method."}, status=400)


@login_required
@csrf_exempt
def track_parcel(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            tracking_number = data.get('tracking_number')


            # Query the parcel based on tracking_number
            parcel = Parcel.objects.filter(tracking_number=tracking_number).first()


            # Query the tracking details based on the parcel
            tracking = Tracking.objects.filter(parcel=parcel).first()

            if not tracking:
                return JsonResponse({'error': 'Tracking details not found'}, status=404)

            # Return tracking details
            response_data = {
                'status': tracking.status,
                'location': tracking.location,
                'expected_delivery':tracking.expected_delivery,
            }

            return JsonResponse(response_data)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


# def sender(request):
#     if request.method == 'POST':
#         name = request. POST.get('name')
#         sender_address = request.POST.get('address')
#         email = request.POST.get('email')
#         phone_number = request.POST.get('number'))
        # shipping.save()

#         send = Sender(name=name, sender_address=sender_address,email=email,phone_number=phone_number)
#         send.save()
        
# def receiver(request):
#     if request.method == 'POST':
#         receiver_name = request.POST.get('name1')
#         receiver_address = request.POST.get('address1')
#         email = request.POST.get('email1')
#         phone_number = request.POST.get('number1')
        
#         receive = Receiver(receiver_name=receiver_name,receiver_address=receiver_address,email=email,phone_number=phone_number)
#         receive.save()

def shipment(request):
    if request.method == 'POST':
        goods = request.POST.get('goods')
        weight = float(request.POST.get('weight'))
        package = request.POST.get('package')
        shipping_cost = request.POST.get('number2')

        name = request.POST.get('name')
        sender_address = request.POST.get('address')
        email = request.POST.get('email')
        phone_number = request.POST.get('number')

        receiver_name = request.POST.get('name1')
        receiver_address = request.POST.get('address1')
        email = request.POST.get('email1')
        phone_number = request.POST.get('number1')
        
        
        shipping = Shipment(goods=goods,weight=weight,package=package,shipping_cost=shipping_cost,name=name, sender_address=sender_address,email=email,phone_number=phone_number,receiver_name=receiver_name,receiver_address=receiver_address)
        shipping.save()
        return redirect ('/mainpage')
   
    
