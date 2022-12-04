from django.shortcuts import get_object_or_404

from django.db.models import Count
from django.http import HttpResponse
from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .models import Event, Location, OrderItem, Order
from .serializers import EventSerializer, LocationSerializer, OrderSerializer,OrderItemSerializer
from rest_framework.permissions import IsAuthenticated
# 
class EventViewSet(ModelViewSet):
    queryset= Event.objects.all()
    serializer_class = EventSerializer
    def get_serializer_context(self):
        return {'request': self.request}

    def destroy(self, request, *args, **kwargs):

        if OrderItem.objects.filter(event_id=kwargs['pk']).count() > 0:
            return Response({'error': 'Event cannot be deleted'})
        return super().destroy(request, *args, **kwargs)

class LocationViewSet(ModelViewSet):
    queryset= Location.objects.annotate(
        events_count = Count('event')).all()
    serializer_class = LocationSerializer
    def delete(self, request, pk):
        location = get_object_or_404(Location, pk=pk)
        if location.events.count()>0:
            return Response({'error': 'Location cannot be deleted'})
        location.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# class StudentViewSet(ModelViewSet):
#     queryset= Student.objects.annotate(
#         student_count = Count('first_name')).all()
#     serializer_class = StudentSerializer
#     def delete(self, request, pk):
#         student = get_object_or_404(Student, pk=pk)
#         student.delete()

class OrderViewSet(ModelViewSet):
    queryset= Order.objects.annotate(
        order_count = Count('payment_status')).all()
    serializer_class = OrderSerializer
    def delete(self, request, pk):
        order = get_object_or_404(Order, pk=pk)
        order.delete()
        
class OrderItemViewSet(ModelViewSet):
    queryset= OrderItem.objects.annotate(
        orderItem_count = Count('unit_price')).all()
    serializer_class = OrderItemSerializer
    def get_serializer_context(self):
        return {'request': self.request}
    def delete(self, request, pk):
        orderItem = get_object_or_404(Order, pk=pk)
        orderItem.delete()



class BookingEvent(APIView):
    permission_classes  = [IsAuthenticated]
    def post(self, request, format=None):
        event_id = request.data.get('event_id', None)
        reason = request.data.get('reason', None)
        quantity = request.data.get('quantity', None)
        event = get_object_or_404(Event, id=event_id)
        order = Order.objects.create(student=request.user)
        orderItem = OrderItem.objects.create(event=event, reason=reason, quantity=quantity, unit_price=event.unit_price, order=order)
        return Response({"Okay"})

class PrevOrders(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderItemSerializer
    def get(self, request, format=None):
        user = request.user
        queryset = OrderItem.objects.filter(order__student=user).all()
        serilaizer = self.serializer_class(queryset, many=True, context={'request': request})
        return Response(serilaizer.data)
