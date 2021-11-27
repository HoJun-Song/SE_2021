from django.urls import path

# from . import views
from .views import createMenu, browseMenu, browseStaffProfile, stock, login, orderMenu, showTable

urlpatterns = [
    # create menu
    path('createMenu/', createMenu.createMenu),

    # browse menu (all)
    path('browseMenu/', browseMenu.browseMenu),
    # browse menu (selected)
    path('getSelectedMenu/', browseMenu.getSelectedMenu),
    # modify menu
    path('modifyMenu/', browseMenu.modifyMenu),
    # delete menu
    path('deleteMenu/', browseMenu.deleteMenu),

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
    
    # show menu
    path('showMenu/', orderMenu.showMenu),
    # order menu
    path('orderMenu/', orderMenu.orderMenu),
    # finish menu
    path('finishMenu/', orderMenu.finishMenu),

    # show table
    path('showTable/', showTable.showTable),
    # show table detail
    path('detailTable/', showTable.detailTable),
]
