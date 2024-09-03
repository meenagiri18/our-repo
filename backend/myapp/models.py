from django.db import models
from django.core.exceptions import ValidationError
import re


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