import json
from django.shortcuts import render
from django.core.serializers import serialize
from rest_framework import generics
from rest_framework.response import Response
from ..models import Menu, Orders
from .. import serializers
from rest_framework.decorators import api_view

@api_view(['POST'])
def orderMenu(request):
    '''
    메뉴 주문 

    2021-11-23 2차
    
    - 메뉴 주문 완료 시 해당 메뉴에 필요한 재고들의 amount 줄이기 (예정)
    '''
    try:
        data = json.loads(request.body)
        for i in data:
            Orders.objects.create(
                id = i['id'],
                amount = i['amount'],
                order_id = i['order_id'],
                menu = Menu.objects.get(id=i['menu']),
            )
        orderlist = Orders.objects.all()
        print(orderlist)
        
        order_menu_price = 0
        for i in orderlist:
            order_menu = Menu.objects.get(id=i.menu.id)
            print(order_menu)
            menu_price = order_menu.price
            menu_amount = i.amount
            order_menu_price = order_menu_price + (menu_price * menu_amount)
            print(order_menu_price)

        '''
        if not login_user.exists() or login_user[0].staff_pw != data['staff_pw']:
            return Response({'MESSAGE' : 'id 혹은 password가 다릅니다.'}, status=401)
        '''
        
    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    output_data = orderlist
    print(output_data)
    serialized_output_data = serializers.OrdersSerializer(output_data, many=True)
    print(serialized_output_data)
    return Response(serialized_output_data.data, status=200)