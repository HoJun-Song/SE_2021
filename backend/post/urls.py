from django.urls import path

# from . import views
from .views import createMenu

urlpatterns = [
    # create menu
    path('createMenu/', createMenu.createMenuAPI.as_view()),
]
