import json
from collections import OrderedDict
from datetime import datetime

from django.db.models import Max
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .. import serializers
from ..models import (Menu, MenuTimer, MenuToStock, Orders, OrderTimer, Stock, Tables)

global order_list
order_list = []
global total_order_price
total_order_price = 0
global order_id
order_id = 0
global cur_order_id
cur_order_id = 0

@api_view(['POST'])
def showMenu(request):
    '''
    메뉴 주문 버튼 클릭 시 전체 메뉴 카테고리로 정렬해서 출력
    
    2021-11-27 1차
    2021-12-04 1차 검수 (완료)
    '''
    try:
        menu_list = Menu.objects.order_by('category')
        
        output_data = menu_list
        serialized_output_data = serializers.MenuSerializer(output_data, many=True)
        return Response(serialized_output_data.data, status=200)
        
    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)
    
@api_view(['POST'])
def orderMenu(request):
    '''
    메뉴 주문 +, - 버튼 클릭 시 총 가격 계산해서 출력
    
    2021-11-27 1차
    2021-12-04 1차 검수 (완료)
    '''
    try:
        global total_order_price
        global order_list
        
        data = json.loads(request.body)
        menu_name = Menu.objects.get(name = data['name']).name
        menu_price = Menu.objects.get(name = data['name']).price

        flag = 0
        max = len(order_list)
        for i in order_list:
            if max == 0:
                break
            
            if i[0] == menu_name:
                i[1] = int(i[1]) + int(data['amount'])
                i[2] = int(i[2]) + data['amount'] * menu_price
                flag = 1
                break
        
        if flag == 0:
            order_menu = menu_name
            order_amount = data['amount']
            order_price = int(data['amount']) * menu_price
            order_list.append(list([order_menu, order_amount, order_price]))
            
        total_order_price = 0
        for i in order_list:
            total_order_price = total_order_price + i[2]

        output_data = {
            'total_price' : total_order_price
        }
        output_data = json.dumps(output_data)
        output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
        return Response(output_data, status=200)
        
    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)
    
@api_view(['POST'])
def finishMenu(request):
    '''
    선택 완료 시 필요한 객체 생성 및 DB갱신 후 출력에 필요한 정보 출력

    2021-12-03 4차
    2021-12-04 1차 검수 (완료)
    '''        
    try:
        global order_id
        global cur_order_id
        
        if not Orders.objects.exists():
            id = 0
        else:
            max_id = Orders.objects.aggregate(id = Max('id'))
            id = max_id['id']
            
        if not Orders.objects.exists():
            order_id = 0
        else:
            max_order_id = Orders.objects.aggregate(order_id = Max('order_id'))
            order_id = max_order_id['order_id']
            
        if not MenuTimer.objects.exists():
            menu_timer_id = 0
        else:
            max_menu_timer_id = MenuTimer.objects.aggregate(id = Max('id'))
            menu_timer_id = max_menu_timer_id['id']
            
        if not OrderTimer.objects.exists():
            order_timer_id = 0
        else:
            max_order_timer_id = OrderTimer.objects.aggregate(id = Max('id'))
            order_timer_id = max_order_timer_id['id']
        
        time_format = "%Y-%m-%d %H:%M:%S"
        current_time = datetime.now().strftime(time_format)
        
        for i in order_list:
            menu_list = Menu.objects.get(name = i[0])
            menu_to_stock_list = MenuToStock.objects.get(menu = menu_list.id)
            stock_list = Stock.objects.get(id = menu_to_stock_list.stock.id)
            stock_list.amount = stock_list.amount - menu_to_stock_list.amount_per_menu * i[1]
            stock_list.save()
            
            Orders.objects.create(
                id = id + 1,
                amount = i[1],
                order_id = order_id + 1,
                menu = Menu.objects.get(name=i[0]),
            )
            id = id + 1
            cur_order_id = order_id + 1
            
            MenuTimer.objects.create(
                id = menu_timer_id + 1,
                menu = Menu.objects.get(name=i[0]),
                order_id = order_id + 1,
                start_time = current_time,
                end_time = ""
            )
            menu_timer_id = menu_timer_id + 1
           
        OrderTimer.objects.create(
            id = order_timer_id + 1,
            start_time = current_time,
            end_time = "",
            order_id = order_id + 1
        )

        output_data = []
        for i in range(len(order_list)):
            dic_data = {
                'menu_name' : order_list[i][0],
                'amount_per_menu' : order_list[i][1],
                'price_per_menu' : order_list[i][2],
                'total_price' : total_order_price
            }
            output_data.append(dic_data)

        output_data = json.dumps(output_data)
        output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
        return Response(output_data, status=200)
        
    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

@api_view(['POST'])
def orderTable(request):
    '''
    테이블 주문 버튼 선택 후 테이블 번호 선택 및 선택 완료 버튼 클릭 시 해당 테이블에 주문 정보 저장

    2021-12-03 2차
    2021-12-04 1차 검수 (완료)
    '''        
    try:
        global order_id
        
        if not Tables.objects.exists():
            id = 0
        else:
            max_id = Tables.objects.aggregate(id = Max('id'))
            id = max_id['id']
        
        data = json.loads(request.body)
        table_id = data['table_id']
        
        if Tables.objects.filter(table_id = table_id).exists():
            return Response({'MESSAGE' : 'TABLE_IS_ALREADY_EXIST'}, status = 401)
        
        table_order_list = Orders.objects.filter(order_id = order_id + 1)
        for i in table_order_list:
            Tables.objects.create(
                id = id + 1,
                order = i,
                table_id = table_id
            )
            id = id + 1
        
        output_data = Tables.objects.filter(table_id = table_id)
        serialized_output_data = serializers.TablesSerializer(output_data, many=True)
        return Response(serialized_output_data.data, status=200)

    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)
