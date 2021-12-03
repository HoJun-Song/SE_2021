import json
from json import encoder
from django.shortcuts import render
from django.core.serializers import serialize
from django.db.models import Max
from rest_framework import generics
from rest_framework.response import Response
#rom django.http.response import JsonResponse
from ..models import Menu, MenuToStock, Orders, Stock, Tables, MenuTimer, OrderTimer
from .. import serializers
from rest_framework.decorators import api_view
from datetime import datetime, timedelta
from collections import OrderedDict

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
    메뉴 주문 버튼 클릭 시
    2021-11-27 1차
    
    - 메뉴 주문 버튼 선택 시 카테고리로 정렬해서 출력 해주기
    - 연동 확인 (예정)
    '''
    try:
        menu_list = Menu.objects.order_by('category')
        
    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    output_data = menu_list
    serialized_output_data = serializers.MenuSerializer(output_data, many=True)
    return Response(serialized_output_data.data, status=200)
    
@api_view(['POST'])
def orderMenu(request):
    '''
    메뉴 주문 
    2021-11-27 1차
    
    - +, - 버튼 눌를 때마다 총 계산 가격 및 주문 정보 저장
    '''
    try:
        flag = 0
        global total_order_price
        data = json.loads(request.body)
        menu_name = Menu.objects.get(name = data['name']).name
        menu_price = Menu.objects.get(name = data['name']).price
        global order_list
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
        
    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    output_data = {
        'total_price' : total_order_price
    }
    
    output_data = json.dumps(output_data)
    output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
    return Response(output_data, status=200)
    
@api_view(['POST'])
def finishMenu(request):
    '''
    선택 완료

    2021-12-03 4차
    
    - 메뉴 선택 완료 시 오더 디비 생성 후 계산 값들 전달
    - 메뉴 주문 완료 시 해당 메뉴에 필요한 재고들의 amount 줄이기
    - 메뉴 선택 완료 시 메뉴, 오더 타이머 객체 생성 및 현재 시간 전달
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
        
        global order_list
        global total_order_price
        
        time_format = "%Y-%m-%d %H:%M:%S"
        current_time = datetime.now().strftime(time_format)
        
        for i in order_list:
            menu_list = Menu.objects.get(name = i[0])
            menu_to_stock_list = MenuToStock.objects.get(menu = menu_list.id)
            stock_list = Stock.objects.get(id = menu_to_stock_list.stock.id)
            stock_list.amount = stock_list.amount - menu_to_stock_list.amount_per_menu * i[1]
            print(stock_list.amount)
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
        
    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    output_data = {
            'menu_name' : [i[0] for i in order_list],
            'amount_per_menu' : [i[1] for i in order_list],
            'price_per_menu' : [i[2] for i in order_list],
            'total_price' : total_order_price
    }
    output_data = json.dumps(output_data)
    output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
    return Response(output_data, status=200)

@api_view(['POST'])
def orderTable(request):
    '''
    테이블 주문

    2021-12-03 2차
    
    - 테이블 주문 완료 시 Order객체를 저장하는 테이블 객체 생성 및 정보 저장
    - 빈 테이블 선택 시 해당 테이블 id로 저장
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
        
    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    output_data = Tables.objects.filter(table_id = table_id)
    serialized_output_data = serializers.TablesSerializer(output_data, many=True)
    return Response(serialized_output_data.data, status=200)

