from django.contrib import admin
from .models import Parcel
from .models import Tracking,Shipment

# Register your models here.
admin.site.register(Parcel)
admin.site.register(Tracking)
@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    list_display =['tracking_number','goods','name','receiver_name','shipping_cost']

