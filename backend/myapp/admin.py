from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Shipment)

class ShipmentAdmin(admin.ModelAdmin):
    list_display =['tracking_number','goods','sender_name','receiver_name', 'status','shipping_cost']
    
admin.site.register(RouteResult)