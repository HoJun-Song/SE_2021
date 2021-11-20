from django.urls import path

# from . import views
from .views import createMenu, browseMenu, login, orderMenu, showTable

urlpatterns = [
    # create menu
    path('createMenu/', createMenu.post),

    # browse menu
    path('browseMenu/', browseMenu.post),

    # browse staff profile
    path('browseMenu/', browseMenu.post),

    # manager login
    path('manager/login/', login.loginManager),

    # staff login
    path('staff/login/', login.loginStaff),

    # find password (staff)
    path('findPW/', login.findPW),
    
    # order menu
    path('orderMenu/', orderMenu.orderMenu),

    # show table
    path('showTable/', showTable.showTable),
]
