import json
from collections import OrderedDict
from datetime import datetime

from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Menu, Orders, OrderTimer, Tables

global selected_table
selected_table = None

@api_view(['POST'])
def showTable(request):
    '''
    전체 테이블 중 테이블 객체가 있는 테이블 id만을 반환

    2021-12-03 1차
    2021-12-04 1차 검수 (완료)
    '''
    try:
        table_list = Tables.objects.all().order_by('table_id')
        table_list = table_list.values_list('table_id').distinct()
        
        output_data = []
        for i in table_list:
            output_data.append({
                'table_id' : i[0]
            })
            
        output_data = json.dumps(output_data)
        output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
        return Response(output_data, status=200)
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

@api_view(['POST'])
def detailTable(request):
    '''
    테이블 상세 정보 열람 

    2021-12-03 1차
    2021-12-04 1차 검수 (완료)
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
        
        output_data = []
        for mn, amt in zip(list(table_menu), list(table_menu_amount)):
            output_data.append({
                "name" : str(mn),
                "amount" : amt,
                "delay_time" : str(delay_time)
            })
        
        output_data = json.dumps(output_data)
        output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
        return Response(output_data, status=200)
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)
        
@api_view(['POST'])
def moveTable(request):
    '''
    이동할 테이블 선택 시 기존 테이블 객체 정보의 table_id를 새로운 table_id로 변경

    2021-12-03 1차
    2021-12-04 1차 검수 (완료)
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