from django.db import models
from django.core.exceptions import ValidationError
import re


# Create your models here.
class Parcel(models.Model):
    sender = models.CharField(max_length=100)
    receiver = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
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
        if not re.match(r'^[A-Za-z\s]+$', self.location):
            raise ValidationError("Location must contain only letters and spaces.")