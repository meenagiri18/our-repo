from django.urls import path
from . import views


urlpatterns = [
   
    path('',views.index, name= 'index'),
    # re_path('^.*$', views.index, name='index'),
    path('signup/',views.signup, name= 'signup'),
    path('login/',views.login, name= 'login'),
    path('mainpage/',views.mainpage, name='mainpage'),
    path('shipment/',views.shipment, name = 'shipment'), 
    path('track/<str:tracking_number>/', views.track_parcel, name='track_parcel'),
    path('track/', views.track, name ='track')
   

]