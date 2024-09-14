from django.db import models
from django.core.exceptions import ValidationError
import uuid
from django.core.mail import send_mail


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
    tracking_number = models.CharField(max_length=12, unique=True, blank=False, null=False, default='')

    # New fields for status, current location, and delivery date
    status_choices = [
        ('CREATED', 'Created'),
        ('PENDING', 'Pending'),
        ('SHIPPED', 'Shipped'),
        ('IN TRANSIT','Transit'),
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
        is_new = self.pk is None
        if is_new and not self.tracking_number:
            self.tracking_number = self.generate_tracking_number()
        super().save(*args, **kwargs)
        if is_new and self.email:
            self.send_tracking_email()

    def generate_tracking_number(self):
         while True:
            tracking_number = str(uuid.uuid4()).replace("-", "").upper()[:12]
            if not Shipment.objects.filter(tracking_number=tracking_number).exists():
                return tracking_number


    def __str__(self):
        return f"{self.tracking_number} - {self.goods}"
    
    def send_tracking_email(self):
        subject = 'Your Shipment Tracking Number'
        message = (
            f"ExpressTrack Pickup Request Submitted Successfully!\n\n"
            f"Dear {self.sender_name},\n\n"
            f"Your shipment pickup request from {self.sender_address} to {self.receiver_address}, "
            f"weighing {self.weight} kg, has been successfully placed with ExpressTrack.\n"
            f"Your Tracking Number is {self.tracking_number}.\n\n"
            f"Thank you for choosing ExpressTrack!"
    )
        from_email = 'meenagiri2058@gmail.com'
        recipient = [self.email]

        send_mail(subject, message, from_email, recipient)





class RouteResult(models.Model):
    flocation = models.CharField(max_length=255)
    tlocation = models.CharField(max_length=255)
    shortest_distance = models.FloatField()
    path = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"From {self.flocation} to {self.tlocation} (Distance: {self.shortest_distance})"