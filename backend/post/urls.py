from django.urls import path

# from . import views
from .views import createMenu, views

urlpatterns = [
    # create menu
    path('createMenu/', createMenu.createMenuAPI.as_view()),
    path('staff/login/', views.LoginAPI.as_view()),
    #path('manager/login/', views.LoginAPI.as_view()),
    #path('findPW/', views.FindPW.post, name='post'),
    path('findPW/', views.post, name='post'),
]
