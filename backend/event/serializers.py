from rest_framework import serializers
from event.models import Event, Location,  Order,OrderItem
from decimal import Decimal

# class StudentSerializer(serializers.ModelSerializer): 
#     class Meta:
#         model=Student
#         fields = ['id', 'first_name', 'last_name', 'four_by_four','student_id', 'email','phone']

class LocationSerializer(serializers.ModelSerializer): 
    class Meta:
        model=Location
        fields = ['id', 'title']

class EventSerializer(serializers.ModelSerializer):
    location_name = serializers.SerializerMethodField(
        
    )
    class Meta:
        model=Event
        fields=['id', 'title', 'description', 'unit_price', 'inventory','price_with_tax', 'location', "location_name",'image', 'date' ]
    
    price_with_tax = serializers.SerializerMethodField(method_name='calculate_tax')
    
    def get_location_name(self, event):
        return event.location.title
    def calculate_tax(self, event):
        return event.unit_price * Decimal(1.1)

class OrderSerializer(serializers.ModelSerializer): 
    class Meta:
        model=Order
        fields = ['id', 'payment_status', 'student']

class OrderItemSerializer(serializers.ModelSerializer): 
    order = OrderSerializer()
    event = EventSerializer()
    class Meta:
        model=OrderItem
        fields = ['id','quantity', 'unit_price','event','order']