from django.db.models.query import QuerySet
from django.shortcuts import render
from django.db.models import Q
from django.db.models import Max
from rest_framework import serializers, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from datetime import datetime, timedelta
from collections import OrderedDict

from ..models import Menu, MenuTimer, OrderTimer, Orders, Tables

@api_view(['POST'])
def showOrderMenu(request):
    '''
    주문된 메뉴 열람

    2021-12-03 1차
    
    - 주문된 메뉴들과 테이블을 반환
    '''
    try:
        menu = Orders.objects.all()
        if not menu.exists():
            return Response({'MESSAGE' : 'ORDER_MENU_IS_EMPTY'}, status=401)
        
        order_list = []
        menu_list = []
        for i in menu:
            menu_list.append(Menu.objects.filter(id = i.menu.id).values('name'))
            order_list.append(i.order_id)
        
        output_data = {
            'menu_name' : [i[0]['name'] for i in list(menu_list)],
            'order_id' : [i for i in order_list],
        }
        output_data = json.dumps(output_data)
        output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
        return Response(output_data, status=200)
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=410)

@api_view(['POST'])
def checkMenuTime(request):
    '''
    메뉴 준비 시간 체크

    2021-12-03 1차

    - 해당 메뉴의 준비 완료 버튼을 누르면 해당 메뉴의 메뉴 타이머의 end_time을 설정
    '''
    try:
        time_format = "%Y-%m-%d %H:%M:%S"
        
        data = json.loads(request.body)
        
        select_menu = MenuTimer.objects.filter(order_id = data['order_id'])
        print(select_menu)
        ready_time = select_menu.get(menu = Menu.objects.get(name = data['name']))
        print(ready_time)
        
        current_time = datetime.now().strftime(time_format)
        
        ready_time.end_time = current_time
        ready_time.save()
    
        return Response({'MESSAGE' : 'SUCCESS'}, status=200)
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)