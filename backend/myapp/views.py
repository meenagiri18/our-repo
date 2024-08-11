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
            messages.info(request, 'Password not same')
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
            parcelid = data.get('parcelid')
           
           
            # Ensure all required fields are provided
            if not all([sender, receiver, location, parcelid]):
                return JsonResponse({"error": "Missing required fields"}, status=400)
            
            if Parcel.objects.filter(parcelid=parcelid).exists():
                return JsonResponse({"error": "Parcel with this ID already exists"}, status=400)

            # Generate tracking number
            tracking_number = generate_tracking_number()

            # Save the parcel to the database
            parcel = Parcel(sender=sender, receiver=receiver, location=location, parcelid=parcelid, tracking_number=tracking_number)
            parcel.save()

            response_data = {
                "message": "Parcel created successfully!",
                "tracking_number": tracking_number
            }
            return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method."}, status=400)