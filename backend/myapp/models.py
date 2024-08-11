from django.db import models

# Create your models here.
class Parcel(models.Model):
    sender = models.CharField(max_length=100)
    receiver = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    parcelid = models.IntegerField(unique=True)
    tracking_number = models.CharField(max_length=20, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.tracking_number
   