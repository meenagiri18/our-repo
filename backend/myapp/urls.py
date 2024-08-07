from django.urls import path,re_path
from . import views

urlpatterns = [
    path('',views.index, name= 'index'),
    re_path('^.*$', views.index, name='index'),
    # path('register',views.register, name= 'register'),
    path('login/',views.login, name= 'login'),
    path('mainpage/',views.mainpage, name='Mainpage')
   


]