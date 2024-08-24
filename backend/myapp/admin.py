from django.contrib import admin
from .models import Parcel
from .models import Tracking

# Register your models here.
admin.site.register(Parcel)
admin.site.register(Tracking)