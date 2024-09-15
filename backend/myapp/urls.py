from django.urls import path
from . import views


urlpatterns = [
   
    path('',views.index, name= 'index'),
    # re_path('^.*$', views.index, name='index'),
    path('signup/',views.signup, name= 'signup'),
    path('login/',views.login, name= 'login'),
    path('mainpage/',views.mainpage, name='mainpage'),
    path('shipment/',views.shipment, name = 'shipment'),
    path('signout/', views.signout_view, name='signout'), 
    # path('api/calculate_route/', views.calculate_route, name='calculate_route'),
    path('route/', views.route, name='route'),
    path('api/route_api/',views.route_api, name='route_api'),
    path('track/', views.track, name ='track'),
    path('api/track_api/', views.track_api, name ='track_api'),
    path('api/trackingN_api/<str:tracking_number>/', views.trackingN_api, name ='trackingN_api'),
   

]