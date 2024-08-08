from django.urls import path,re_path
from . import views


urlpatterns = [
     path('api/go/',views.go,name='go'),
    path('',views.index, name= 'index'),
    # re_path('^.*$', views.index, name='index'),
    path('signup/',views.signup, name= 'signup'),
    path('login/',views.login, name= 'login'),
    path('mainpage/',views.mainpage, name='mainpage'),
]