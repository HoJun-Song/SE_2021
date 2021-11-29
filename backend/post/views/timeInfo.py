#browseMenu.py
from django.db.models.query import QuerySet
from django.shortcuts import render
from django.db.models import Q
from django.db.models import Max
from rest_framework import serializers, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from datetime import datetime, timedelta

from ..models import Menu, Orders, MenuTimer, OrderTimer

def total_seconds(timedelta):
    return  (timedelta.seconds + timedelta.days * 24 * 3600) * 10 ** 6


@api_view(['POST'])
def browse(request):
    '''
    시간 정보 열람

    2021-11-29 1차
    
    * orderMenu.finishMenu 에서 OrderTimer에 start_time 저장 필요 (미완료)

    - /post/browseTimeInfo/ 로 빈 request가 넘어오면 고객 평균 체류 시간, 메뉴 별 소요 시간 반환 (미완료)

    '''
    try:
        time_format = "%Y-%m-%d %H:%M:%S"

        # 고객 평균 체류 시간
        order_time_objs = OrderTimer.objects.all()
        order_time_list = list(order_time_objs.values_list())
        order_time = []

        for ot in order_time_list:
            start_ot = datetime.strptime(ot[1], time_format)
            end_ot = datetime.strptime(ot[2], time_format)
            order_time.append(end_ot - start_ot)
            
        avg_order_time = sum(order_time, timedelta(0)) / len(order_time_list)

        # 메뉴 별 소요시간
        menu_objs = Menu.objects.all()
        menu_time_objs = MenuTimer.objects.all()
        menu_time = []
        
        for i in range(1, Menu.objects.aggregate(id=Max('id'))['id'] + 1):
            menu_time_info_i = []

            # 각각의 Menu object(instance)
            menu_i = Menu.objects.filter(id=i)

            # 각 Menu에 따른 timer 객체
            menu_time_i = MenuTimer.objects.filter(menu_id__in=menu_i)

            if not menu_time_i.exists(): continue # Menu 이름 추가 필요
            
            # for i_obj in menu_time_i:
            #     start_mt = list(OrderTimer.objects.filter(id__in=i_obj).values_list('start_time'))[0][0]
            #     start_mt = datetime.strptime(start_mt, time_format)
            #     end_mt = MenuTimer.objects.filter(Q(menu_id__in=menu_i) & ).values_list('end_time')[0][0]
            #     end_mt = datetime.strptime(end_mt, time_format)
            #     menu_time_info_i.append(start_mt - end_mt)

            # avg_menu_time_i = sum(menu_time_info_i, timedelta(0)) / len(order_time_list)

            

        


    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=410)

    output_data = None
    return Response(output_data, status=200)
    