from django.db import models
from django.core.exceptions import ValidationError
import re,uuid


# Create your models here.
class Parcel(models.Model):
    sender = models.CharField(max_length=100)
    receiver = models.CharField(max_length=100)
    current_location = models.CharField(max_length=100,default='Unknown')
    destination_location = models.CharField(max_length=100,default='Unknown')
    parcelid = models.AutoField(primary_key=True)
    tracking_number = models.CharField(max_length=20, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.tracking_number
    
    def clean(self):
        super().clean()
        if not re.match(r'^[A-Za-z\s]+$', self.sender):
            raise ValidationError("Sender name must contain only letters and spaces.")
        if not re.match(r'^[A-Za-z\s]+$', self.receiver):
            raise ValidationError("Receiver name must contain only letters and spaces.")
        if not re.match(r'^[A-Za-z\s]+$', self.current_location):
            raise ValidationError("Current location must contain only letters and spaces.")
        if not re.match(r'^[A-Za-z\s]+$', self.destination_location):
            raise ValidationError("Destination location must contain only letters and spaces.")
        

class Tracking(models.Model):
    parcel = models.OneToOneField(Parcel, on_delete=models.CASCADE, related_name='tracking')
    status = models.CharField(max_length=50)  # e.g., 'In Transit', 'Delivered'
    location = models.CharField(max_length=100,default='Unknown')
    expected_delivery = models.DateField(null=True)  # Optional field for expected delivery date

    def __str__(self):
        return f"Tracking for {self.parcel.tracking_number}"
    
    def clean(self):
        super().clean()
        if not re.match(r'^[A-Za-z\s]+$', self.location):
            raise ValidationError("Location must contain only letters and spaces.")

# class Sender(models.Model):
#     name = models.CharField(max_length=100)
#     sender_address = models.CharField(max_length=100)
#     email = models.EmailField(max_length=100)
#     phone_number = models.IntegerField()

# class Receiver(models.Model):
#     receiver_name = models.CharField(max_length=100)
#     receiver_address = models.CharField(max_length=100)
#     email = models.EmailField(max_length=100)
#     phone_number = models.IntegerField()

class Shipment(models.Model):
    goods = models.CharField(null=True,max_length=100)
    weight = models.IntegerField(null=True)
    package = models.IntegerField(null=True,blank=True)
    shipping_cost = models.DecimalField(max_digits=1000, decimal_places=2,null=True)
    
    name = models.CharField(max_length=100,null=True)
    sender_address = models.CharField(null=True,max_length=100)
    email = models.EmailField(null=True)
    phone_number = models.IntegerField(null=True)

    receiver_name = models.CharField(max_length=100,null=True)
    receiver_address = models.CharField(null=True,max_length=100)
    tracking_number = models.CharField(max_length=12, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.tracking_number:
            self.tracking_number = str(uuid.uuid4()).replace("-", "").upper()[:12]
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.tracking_number} - {self.goods}"


   

