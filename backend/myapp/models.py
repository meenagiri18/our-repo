from django.db import models
import uuid
from django.core.mail import send_mail


# Create your models here.
class Shipment(models.Model):
    goods = models.CharField(null=True, max_length=100)
    weight = models.IntegerField(null=True)
    package = models.IntegerField(null=True, blank=True)
    shipping_cost = models.DecimalField(max_digits=65, decimal_places=2, null=True)
    
    sender_name = models.CharField(max_length=100, null=True)
    sender_address = models.CharField(null=True, max_length=100)
    email = models.EmailField(null=True)
    phone_number = models.CharField(max_length=15, null=True)

    receiver_name = models.CharField(max_length=100, null=True)
    receiver_address = models.CharField(null=True, max_length=100)
    
    tracking_number = models.CharField(max_length=12, unique=True, blank=False, null=False, default='')
    is_approve = models.BooleanField(default=False)

    # New fields for status, current location, and delivery date
    status_choices = [
        ('CREATED', 'Created'),
        ('PENDING', 'Pending'),
        ('SHIPPED', 'Shipped'),
        ('IN TRANSIT', 'Transit'),
        ('DELIVERED', 'Delivered'),
    ]
    status = models.CharField(max_length=10, choices=status_choices, default='PENDING')
    current_location = models.CharField(max_length=100, null=True, blank=True)
    delivery_date = models.DateField(null=True, blank=True)

    def save(self, *args, **kwargs):
        """Override save to handle approval logic and tracking number generation."""
        is_new = self.pk is None
        was_approved = False

        if not is_new:
            # Fetch the previous value of `is_approve` before saving
            previous = Shipment.objects.get(pk=self.pk)
            was_approved = previous.is_approve

        # Generate tracking number for new records
        if is_new and not self.tracking_number:
            self.tracking_number = self.generate_tracking_number()

        # Call the parent save method
        super().save(*args, **kwargs)

        # Send email only if `is_approve` changed from False to True
        if not was_approved and self.is_approve:
            self.send_approval_email()

    def generate_tracking_number(self):
        """Generates a 12-character unique tracking number."""
        while True:
            tracking_number = str(uuid.uuid4()).replace("-", "").upper()[:12]
            if not Shipment.objects.filter(tracking_number=tracking_number).exists():
                return tracking_number

    def send_approval_email(self):
        """Send approval email when the shipment is approved."""
        subject = 'Your Shipment has been Approved'
        message = f'Your shipment with tracking number {self.tracking_number} has been approved.'
        from_email = 'meenagiri2058@gmail.com'
        recipient = [self.email]

        send_mail(subject, message, from_email, recipient)

    def __str__(self):
        return f"{self.tracking_number} - {self.goods}"

   



class RouteResult(models.Model):
    flocation = models.CharField(max_length=255)
    tlocation = models.CharField(max_length=255)
    shortest_distance = models.FloatField()
    path = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"From {self.flocation} to {self.tlocation} (Distance: {self.shortest_distance})"