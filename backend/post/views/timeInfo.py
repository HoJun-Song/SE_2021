import json
from collections import OrderedDict
from datetime import datetime, timedelta

from django.db.models import Max, Q
from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import generics, serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Menu, MenuTimer, OrderTimer


@api_view(['POST'])
def browse(request):
    '''
    시간 정보 열람

    2021-11-29 1차
    2021-12-03 2차
    
    * orderMenu.finishMenu 에서 OrderTimer에 start_time 저장 필요 (완료)
    ** menuTimer, orderTime schema 변경 (완료-2차)

    - /post/browseTimeInfo/ 로 빈 request가 넘어오면 고객 평균 체류 시간, 메뉴 별 소요 시간 반환 (완료-2차)

    '''
    try:
        time_format = "%Y-%m-%d %H:%M:%S"

        # 고객 평균 체류 시간
        order_time_objs = OrderTimer.objects.all()
        order_time_list = list(order_time_objs.values_list())
        order_time = []

        for ot in order_time_list:
            start_ot = datetime.strptime(ot[1], time_format)
            end_ot = datetime.strptime(ot[2], time_format) if ot[2] else ""
            order_time.append(end_ot - start_ot)
            
        avg_order_time = sum(order_time, timedelta(0)) / len(order_time_list)

        # 메뉴 별 소요시간
        menu_name = []
        menu_time = []
        
        for i in range(1, Menu.objects.aggregate(id=Max('id'))['id'] + 1):
            menu_time_info_i = []

            # 각각의 Menu object(instance)
            menu_i = Menu.objects.filter(id=i)

            if not menu_i.exists(): 
                continue 

            # 각 Menu에 따른 timer 객체
            menu_time_i = MenuTimer.objects.filter(menu_id__in=menu_i)

            # 저장된 time 정보가 없을 경우 00:00으로 설정
            if not menu_time_i.exists(): 
                menu_name.append(list(menu_i.values_list('name'))[0][0])
                menu_time.append(str(timedelta(0)))
                continue
            
            for i_obj in menu_time_i:
                start_mt = datetime.strptime(i_obj.start_time, time_format)
                end_mt = datetime.strptime(i_obj.end_time, time_format) if i_obj.end_time else ""
                menu_time_info_i.append(end_mt - start_mt)

            avg_menu_time_i = sum(menu_time_info_i, timedelta(0)) / len(menu_time_i)
            menu_time.append(avg_menu_time_i)
            menu_name.append(list(menu_i.values_list('name'))[0][0])

        time_list = []
        for mn, mt in zip(list(menu_name), list(menu_time)):
            time_list.append({
                "average_order_time" : str(avg_order_time),
                "menu_name"          : mn,
                "menu_time"          : str(mt)
            })
            
        output_data = json.dumps(time_list)
        output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
        return Response(output_data, status=200)

    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=410)

    