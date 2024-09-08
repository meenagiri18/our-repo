
from rest_framework import serializers
from .models import Shipment, Route

class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = ['tracking_number', 'current_location', 'destination']

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ['start_location', 'end_location', 'distance']
