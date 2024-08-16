from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.http import HttpResponse,JsonResponse
import random
import string
import json
from .models import Parcel
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
    




def generate_tracking_number():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))

@csrf_exempt
def create_parcel(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            sender = data.get('sender_name')
            receiver = data.get('receiver_name')
            location = data.get('location')
            
           
           
            # Ensure all required fields are provided
            if not all([sender, receiver, location]):
                return JsonResponse({"error": "Missing required fields"},status=400)
            
            # Validate that sender and receiver names are not integers
            # if not sender.isalpha() or not receiver.isalpha():
            #     return JsonResponse({"error": "Sender and receiver names must only contain letters."})
            
           
            # Generate tracking number
            tracking_number = generate_tracking_number()

            # Save the parcel to the database
            parcel = Parcel(sender=sender, receiver=receiver, location=location, tracking_number=tracking_number)
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