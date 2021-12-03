#browseMenu.py
from django.db.models.query import QuerySet
from rest_framework import serializers, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from collections import OrderedDict

# from ..serializers import MenuSerializer
from ..models import Tables, Orders, Menu, MenuToStock
from .. import serializers

@api_view(['POST'])
def showTable(request):
    '''
    전체 테이블 출력

    2021-12-03 1차
    
    - 전체 테이블 중 table객체가 만들어진 table_id만을 반환
    '''
    try:
        table_list = Tables.objects.all().order_by('table_id')
        table_list = table_list.values_list('table_id').distinct()
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    output_data = {
        'table_id' : [i[0] for i in table_list]
    }
    output_data = json.dumps(output_data)
    output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
    return Response(output_data, status=200)

@api_view(['POST'])
def detailTable(request):
    '''
    테이블 상세 정보 열람 

    2021-11-27 1차
    
    - 특정 테이블 선택 시 해당 테이블의 주문 확인
    '''
    try:
        data = json.loads(request.body)
        detail_table = Tables.objects.filter(table_id = data["table_id"])
        table_order = Orders.objects.filter(id = detail_table.values('order_id'))
        print(table_order)
        
        if not table_order.exists():
            return Response({'MESSAGE' : 'TABLE_IS_EMPTY'}, status=401)
        
        order_menu_price = 0
        for i in table_order:
            order_menu = Menu.objects.get(id=i.menu.id)
            print(order_menu)
            menu_price = order_menu.price
            menu_amount = i.amount
            order_menu_price = order_menu_price + (menu_price * menu_amount)
            print(order_menu_price)
            
        
        
        amount_list = MenuToStock.objects.filter(stock = detail_table.id)
        print(amount_list)
        menu_name = Menu.objects.filter(id__in = amount_list.values('menu')).values_list('name')
        print(menu_name)
        
        output_data = {
            'name' : detail_table.name,
            'unit' : detail_table.unit,
            'price' : detail_table.price,
            'menu_name' : [i[0] for i in list(menu_name)],
            'amount_per_menu' : [i[0] for i in list(amount_list.values_list('amount_per_menu'))]
        }
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    return Response(output_data, status=200)
