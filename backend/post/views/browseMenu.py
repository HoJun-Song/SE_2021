#browseMenu.py
from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import serializers, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

# from ..serializers import MenuSerializer
from ..models import Menu, MenuToStock, Stock
from .. import serializers

@api_view(['POST'])
def post(request):
    '''
    메뉴 열람 (전체)

    2021-11-20 1차
    
    - /post/browseMenu/ 로 빈 request가 넘어오면 전체 메뉴 반환 (완료-1차)

    - MenuToStock, Stock table 묶어서 반환 (미완료)
    '''
    try:
        menu_list = Menu.objects.all()

        if not menu_list.exists():
            return Response({'MESSAGE' : 'MENU_TALBE_IS_EMPTY'}, status=400)
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=410)


    output_data = menu_list #.only('id', 'name')
    serialized_output_data = serializers.MenuSerializer(output_data, many=True)
    return Response(serialized_output_data.data, status=200)


@api_view(['POST'])
def getSelectedMenu(request):
    '''
    메뉴 열람 (선택한 메뉴)

    2021-11-23 1차
    
    - /post/getSelectedMenu/ 로 선택한 menu id가 넘어오면 해당 메뉴-재고 정보 반환 (완료-1차)
    - MenuToStock, Stock table 묶어서 반환 (완료-1차)
    
    '''
    try:
        data = json.loads(request.body)

        # request받은 id와 일치하는 전체 menu object
        menu_info = Menu.objects.filter(id=data['id']) 

        # request받은 id를 가지는 MenuToStock object의 'stock' value
        menu_stock = MenuToStock.objects.filter(menu__in=menu_info).values('stock') 

        # MenuToStock에 저장된 stock(id)를 통해 stock object 추출
        stock_info = Stock.objects.filter(id__in=menu_stock) 

        menu_list = [{
            "menu_name"        : list(menu_info.values_list('name'))[0][0],
            "menu_category"    : list(menu_info.values_list('category'))[0][0],
            "menu_price"       : list(menu_info.values_list('price'))[0][0],
            "amount_per_menu"  : [i[0] for i in list(menu_stock.values_list('amount_per_menu'))], 
            "stock_per_menu"   : [i[0] for i in list(stock_info.values_list('name'))]
        }]

    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=410)

    output_data = menu_list
    return Response(output_data, status=200)
    