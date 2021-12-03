from django.db.models.query import QuerySet
from django.shortcuts import render
from django.db.models import Q
from rest_framework import serializers, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from collections import OrderedDict
from datetime import datetime, timedelta
import json


from ..models import Menu, Orders, OrderTimer
from .. import serializers
from .orderMenu import *

global order_total_price
order_total_price = 0
global cur_order
cur_order = None
global cur_order_list
cur_order_list = None
global cur_table_id
cur_table_id = 0


@api_view(['POST'])
def check(request):
    '''
    결제

    2021-12-03 1차
    
    * 테이블 경로 : table_id를 request로
    * 포장 경로   : 빈 request

    - /post/pay/ 로 포장/테이블 정보가 넘어오면 주문 정보 반환(orderMenu.finishMenu와 동일) (완료-1차)

    '''
    try:
        data = json.loads(request.body)
        
        global cur_table_id

        if data:
            # 테이블 주문일 경우
            table = Tables.objects.filter(table_id=data['table_id'])
            order = Orders.objects.filter(order_id__in=table)
            cur_table_id = table.first().table_id
        else:
            # 포장 주문일 경우
            global cur_order_id
            order = Orders.objects.filter(order_id=cur_order_id)
            cur_table_id = 0

        global cur_order
        cur_order = order

        order_list = []
        total_price = 0
        for o in order:
            menu = Menu.objects.get(id=o.menu_id)
            order_menu = menu.name
            order_amount = o.amount
            order_price = menu.price * order_amount

            order_list.append(list([order_menu, order_amount, order_price]))
            total_price += order_price

        global cur_order_list; cur_order_list = order_list
        global order_total_price; order_total_price = total_price

    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=410)


    output_data = {
        'menu_name' : [i[0] for i in order_list],
        'amount_per_menu' : [i[1] for i in order_list],
        'price_per_menu' : [i[2] for i in order_list],
        'total_price' : total_price
    }
    output_data = json.dumps(output_data)
    output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
    return Response(output_data, status=200)

@api_view(['POST'])
def total(request):
    '''
    전체 결제 금액

    2021-12-03 1차
    
    - /post/total/ 로 빈 request가 넘어오면 전체 결제 금액 반환 (완료-1차)

    '''
    try:
        global order_total_price

    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=410)

    output_data = {
        "total" : order_total_price
    }
    output_data = json.dumps(output_data)
    output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
    return Response(output_data, status=200)

@api_view(['POST'])
def payment(request):
    '''
    결제 (현금&카드 결제)

    2021-12-03 1차
    
    - /post/payment/ 로 빈 request가 넘어오면
      - 현재 Order, Table object(instance) 삭제 (global로 임시 저장)
      - MenuTimer, OrderTimer의 endtime 설정

    '''
    try:
        global cur_order, cur_order_list, cur_table_id, order_total_price
        
        # OrderTimer의 endtime 설정
        table = Tables.objects.filter(table_id=cur_table_id)
        order = Orders.objects.filter(order_id__in=table)

        time_format = "%Y-%m-%d %H:%M:%S"
        current_time = datetime.now().strftime(time_format)
        order_timer = OrderTimer.objects.get(order_id=order.first().order_id)
        order_timer.end_time = current_time
        order_timer.save()
        print(order_timer.end_time)
        # 현재 Order, Table object(instance) 삭제
        order.delete()

        output_data = {
            'menu_name' : [i[0] for i in cur_order_list],
            'amount_per_menu' : [i[1] for i in cur_order_list],
            'price_per_menu' : [i[2] for i in cur_order_list],
            'total_price' : order_total_price,
            'table' : cur_table_id # 포장일 경우 0
        }
        cur_order_list = None
        order_total_price = 0

    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=410)

    output_data = json.dumps(output_data)
    output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
    return Response(output_data, status=200)