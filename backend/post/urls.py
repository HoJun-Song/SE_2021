from django.urls import path

# from . import views
from .views import createMenu, views

urlpatterns = [
    # create menu
    path('createMenu/', createMenu.createMenuAPI.as_view()),
    path('manager/login/', views.loginManager, name='loginManager'),
    path('staff/login/', views.loginStaff, name='loginStaff'),
    #path('findPW/', views.FindPW.post, name='post'),
    path('findPW/', views.findPW, name='findPW'),
]
