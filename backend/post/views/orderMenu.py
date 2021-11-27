import json
from django.shortcuts import render
from django.core.serializers import serialize
from django.db.models import Max
from rest_framework import generics
from rest_framework.response import Response
from ..models import Menu, Orders
from .. import serializers
from rest_framework.decorators import api_view

global order_list
order_list = []
global total_order_price
total_order_price = 0

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
        print(data)
        menu_name = Menu.objects.get(name = data['name']).name
        menu_price = Menu.objects.get(name = data['name']).price
        global order_list
        max = len(order_list)
        print(max)
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
              
        print(order_list)
        total_order_price = 0
        for i in order_list:
            total_order_price = total_order_price + i[2]
        
    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    output_data = {
        'total_price' : total_order_price
    }
    print(output_data)
    return Response(output_data, status=200)
    
@api_view(['POST'])
def finishMenu(request):
    '''
    선택 완료

    2021-11-23 3차
    
    - 메뉴 주문 완료 시 해당 메뉴에 필요한 재고들의 amount 줄이기 (예정)
    '''
    if not Orders.objects.exists():
        id = 0
    else:
        max_id = Orders.objects.aggregate(id = Max('id'))
        id = max_id['id']
        
    try:
        data = json.loads(request.body)
        print(data)
        for i in data:
            Orders.objects.create(
                id = i['id'],
                amount = i['amount'],
                order_id = i['order_id'],
                menu = Menu.objects.get(id=i['menu']),
            )
        orderlist = Orders.objects.filter(id=data['id'])
        print(orderlist)
        
        menu_list = Menu.objects.filter(id__in = orderlist.values('menu')).values_list('name')
        amount_list = orderlist.values_list('amount')
        price_list = []
        order_menu_price = 0
        for i in orderlist:
            order_menu = Menu.objects.get(id=i.menu.id)
            print(order_menu)
            menu_price = order_menu.price
            menu_amount = i.amount
            order_menu_price = order_menu_price + (menu_price * menu_amount)
            price_list.append(menu_price * menu_amount)
            print(order_menu_price)
            
        #menu_name = Menu.objects.filter(id__in = orderlist.values('menu')).values_list('name')
        
    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    output_data = {
            'menu_name' : [i[0] for i in list(menu_list)],
            'amount_per_menu' : [i[0] for i in list(amount_list)],
            'price_per_menu' : [i[0] for i in list(price_list)]
        }
    print(output_data)
    #serialized_output_data = serializers.OrdersSerializer(output_data, many=True)
    #print(serialized_output_data)
    return Response(output_data, status=200)

