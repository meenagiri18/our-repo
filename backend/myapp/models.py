from django.db import models
from django.core.exceptions import ValidationError
import uuid


# Create your models here.




class Shipment(models.Model):
    goods = models.CharField(null=True,max_length=100)
    weight = models.IntegerField(null=True)
    package = models.IntegerField(null=True,blank=True)
    shipping_cost = models.DecimalField(max_digits=1000, decimal_places=2,null=True)
    
    sender_name = models.CharField(max_length=100,null=True)
    sender_address = models.CharField(null=True,max_length=100)
    email = models.EmailField(null=True)
    phone_number = models.CharField(max_length=15,null=True)

    receiver_name = models.CharField(max_length=100,null=True)
    receiver_address = models.CharField(null=True,max_length=100)
    tracking_number = models.CharField(max_length=12, unique=True, blank=True)

    # New fields for status, current location, and delivery date
    status_choices = [
        ('PENDING', 'Pending'),
        ('SHIPPED', 'Shipped'),
        ('DELIVERED', 'Delivered'),
    ]
    status = models.CharField(max_length=10, choices=status_choices, default='PENDING')
    current_location = models.CharField(max_length=100, null=True, blank=True)
    delivery_date = models.DateField(null=True, blank=True)

    def clean(self):
        if self.weight is not None and self.weight < 0:
            raise ValidationError('Weight cannot be negative.')
        if self.shipping_cost is not None and self.shipping_cost < 0:
            raise ValidationError('Shipping cost cannot be negative.')

    def save(self, *args, **kwargs):
        if not self.tracking_number:
            self.tracking_number = str(uuid.uuid4()).replace("-", "").upper()[:12]
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.tracking_number} - {self.goods}"


