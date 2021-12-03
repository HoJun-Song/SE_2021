#browseMenu.py
from django.db.models.query import QuerySet
from rest_framework import serializers, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from collections import OrderedDict
from datetime import datetime, timedelta

# from ..serializers import MenuSerializer
from ..models import Tables, Orders, Menu, OrderTimer

global selected_table
selected_table = None

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

    2021-12-03 1차
    
    - 특정 테이블 선택 시 해당 테이블의 주문 확인
    '''
    try:
        global selected_table
        time_format = "%Y-%m-%d %H:%M:%S"
        
        data = json.loads(request.body)
        selected_table = data["table_id"]
        detail_table = Tables.objects.filter(table_id = data["table_id"])
        
        if not detail_table.exists():
            return Response({'MESSAGE' : 'TABLE_IS_EMPTY'}, status=401)
    
        table_order = Orders.objects.filter(order_id = detail_table[0].order.id)
        
        table_time = OrderTimer.objects.get(id = detail_table[0].order.id).start_time
        table_time = datetime.strptime(table_time, time_format)
        current_time = datetime.now().replace(microsecond=0)
        delay_time = current_time-table_time
        
        table_menu = []
        table_menu_amount = []
        for i in table_order:
            menu_name = Menu.objects.get(id = i.menu.id).name
            menu_amount = i.amount
            table_menu.append(menu_name)
            table_menu_amount.append(int(menu_amount))
        
        ouput_data = {
            'name' : [i for i in table_menu],
            'amount' : [i for i in table_menu_amount],
            'delay_time' : str(delay_time)
        }
        output_data = json.dumps(ouput_data)
        output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
        return Response(output_data, status=200)
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)
        
@api_view(['POST'])
def moveTable(request):
    '''
    테이블 이동

    2021-12-03 1차
    
    - 이동할 테이블 선택 시 기존 테이블 객체 정보의 table_id를 새로운 table_id로 변경
    '''
    try:
        global selected_table
        data = json.loads(request.body)
        
        origin_table = Tables.objects.filter(table_id = selected_table)
        
        if Tables.objects.filter(table_id = data['table_id']).exists():
            return Response({'MESSAGE' : 'TABLE_IS_ALREADY_EXIST'}, status = 401)
        
        for i in origin_table:
            modify_table = i
            modify_table.table_id = data['table_id']
            modify_table.save()
    
        return Response({'MESSAGE' : 'SUCCESS'}, status=200)
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)
