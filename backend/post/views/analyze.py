import json
from collections import OrderedDict

from django.db.models import Max, Q
from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import generics, serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Menu, Orders

global sales_list
sales_list = None
global total_price
total_price = -1

@api_view(['POST'])
def browse(request):
    '''
    판매 분석 (메뉴 별 인기도 목록)

    2021-12-03 1차
    2021-12-04 1차 검수 (완료)
    
    - /post/analyze/ 로 빈 request가 넘어오면 총 매출, 인기도 별로 정렬된 메뉴 이름 반환 (완료-1차)
    - 월 단위 인기도 파악 및 반환 (미완료)

    '''
    try:
        menu = [] # 이름, 가격, 주문량
        menu_objs = Menu.objects.all()

        ### 정보 추출
        for m in menu_objs:
            
            menu_per_order = Orders.objects.filter(menu_id=m)

            if not menu_per_order.exists():
                menu.append([m.name, m.price, 0])
                continue 

            menu_per_amount = 0
            for mo in menu_per_order:
                menu_per_amount += mo.amount
            
            menu.append([m.name, m.price, menu_per_amount])

        ### 인기도 계산 및 정렬 (판매량 기준)
        for m in menu: m.append(m[1] * m[2])
        menu = sorted(menu, key=lambda m : -m[2])
        total_sales = sum(i[3] for i in menu)
        
        menu_list = []
        for m in menu:
            menu_list.append({
                "total_sales" : total_sales,
                "menu_name"   : m[0]
            })
        
        global sales_list; sales_list = menu
        global total_price; total_price = total_sales

        output_data = json.dumps(menu_list)
        output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
        return Response(output_data, status=200)

    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=410)

@api_view(['POST'])
def detail(request):
    '''
    판매 분석 (메뉴 별 주문량, 매출비율, 총 매출액 확인)

    2021-12-03 1차
    2021-12-04 1차 검수 (완료)
    
    - /post/analyze/ 로 menu의 이름이 넘어오면 메뉴 별 주문량, 매출비율, 총 매출액 반환 (완료-1차)
    - 월 단위 인기도 파악 및 반환 (미완료)

    '''
    try:
        global sales_list, total_price
        data = json.loads(request.body)

        if sales_list == None or total_price == -1:
            return Response({'MESSAGE' : 'WRONG_ROUTE'}, status=400)
        if not data:
            return Response({'MESSAGE' : 'EMPTY_REQUEST'}, status=401)

        menu_name = data['name']
        menu = []

        for s in sales_list:
            if s[0] == menu_name:
                menu = s

        ### global로 저장된 sales_list를 반환할 json format으로 가공
        menu_info = {
            "menu_name"   : menu[0],
            "menu_sales"  : menu[2],
            "menu_price"  : menu[3],
            "menu_rate"   : round((menu[3] / total_price) * 100, 0)
        }
        
        output_data = json.dumps(menu_info)
        output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
        return Response(output_data, status=200)

    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=410)
