from django.urls import path,re_path
from . import views
from .views import create_parcel



urlpatterns = [
   
    path('',views.index, name= 'index'),
    # re_path('^.*$', views.index, name='index'),
    path('signup/',views.signup, name= 'signup'),
    path('login/',views.login, name= 'login'),
    path('mainpage/',views.mainpage, name='mainpage'),
    
    path('api/create_parcel/',views.create_parcel,name='create_parcel')
]