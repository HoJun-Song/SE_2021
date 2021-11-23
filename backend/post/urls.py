from django.urls import path

# from . import views
from .views import createMenu, browseMenu, browseStaffProfile, stock, login, orderMenu, showTable

urlpatterns = [
    # create menu
    path('createMenu/', createMenu.post),

    # browse menu (all)
    path('browseMenu/', browseMenu.post),
    # browse menu (selected)
    path('getSelectedMenu/', browseMenu.getSelectedMenu),

    # browse staff profile
    path('browseStaffProfile/', browseStaffProfile.post),

    # browse stock
    path('browseStock/', stock.browse),
    # browse stock detail
    path('detailStock/', stock.detail),
    # create stock
    path('createStock/', stock.create),
    # delete stock
    path('deleteStock/', stock.delete),
    # modify stock
    path('modifyStock/', stock.modify),
    # order stock
    path('orderStock/', stock.order),

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
