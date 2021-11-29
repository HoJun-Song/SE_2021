import json
from json import encoder
from django.shortcuts import render
from django.core.serializers import serialize
from django.db.models import Max
from rest_framework import generics
from rest_framework.response import Response
#rom django.http.response import JsonResponse
from ..models import Menu, MenuToStock, Orders, Stock, Tables
from .. import serializers
from rest_framework.decorators import api_view
from collections import OrderedDict

global order_list
order_list = []
global total_order_price
total_order_price = 0
global order_id
order_id = 0

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

    2021-11-27 3차
    
    - 메뉴 선택 완료 시 오더 디비 생성 후 계산 값들 전달
    - 메뉴 주문 완료 시 해당 메뉴에 필요한 재고들의 amount 줄이기 (예정)
    '''        
    try:
        global order_id
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
        
        global order_list
        global total_order_price
        print(order_list)
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

    2021-11-29 1차
    
    - 테이블 주문 완료 시 Order객체를 저장하는 테이블 객체 생성 및 정보 저장
    '''        
    try:
        global order_id
        if not Tables.objects.exists():
            id = 0
        else:
            max_id = Tables.objects.aggregate(id = Max('id'))
            id = max_id['id']
        if not Tables.objects.exists():
            table_id = 0
        else:
            max_table_id = Tables.objects.aggregate(table_id = Max('table_id'))
            table_id = max_table_id['table_id']
        
        table_order_list = Orders.objects.filter(order_id = order_id + 1)
        for i in table_order_list:
            Tables.objects.create(
                id = id + 1,
                order = i,
                table_id = table_id + 1
            )
            id = id + 1
        
    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    output_data = Tables.objects.filter(table_id = table_id + 1)
    serialized_output_data = serializers.TablesSerializer(output_data, many=True)
    return Response(serialized_output_data.data, status=200)

