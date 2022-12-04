from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views


router = DefaultRouter()
router.register('events', views.EventViewSet)
router.register('locations', views.LocationViewSet)
# router.register('students', views.StudentViewSet)
router.register('orders', views.OrderViewSet)
router.register('orderItem', views.OrderItemViewSet)
# URLConf
urlpatterns=router.urls

urlpatterns += [
    path('book_event/', views.BookingEvent.as_view()),
    path('prev_booking/', views.PrevOrders.as_view())
]
