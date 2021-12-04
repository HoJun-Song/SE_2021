import json
from collections import OrderedDict

from django.db.models import Q
from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import generics, serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .. import serializers
from ..models import Menu, MenuToStock, Stock, Orders

global selected_menu
selected_menu = None

@api_view(['POST'])
def browseMenu(request):
    '''
    메뉴 열람 (전체)

    2021-11-20 1차
    2021-12-04 1차 검수 (완료)
    
    - /post/browseMenu/ 로 빈 request가 넘어오면 전체 메뉴 반환 (완료-1차)

    '''
    try:
        menu_list = Menu.objects.all()

        if not menu_list.exists():
            return Response({'MESSAGE' : 'MENU_TALBE_IS_EMPTY'}, status=400)

        output_data = menu_list
        serialized_output_data = serializers.MenuSerializer(output_data, many=True)
        return Response(serialized_output_data.data, status=200)
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=410)

@api_view(['POST'])
def getSelectedMenu(request):
    '''
    메뉴 열람 (선택한 메뉴)

    2021-11-23 1차
    2021-11-27 2차
    
    - /post/getSelectedMenu/ 로 선택한 menu id가 넘어오면 해당 메뉴-재고 정보 반환 (완료-1차)
    - MenuToStock, Stock table 묶어서 반환 (완료-1차)
    - request로 id가 아닌 name으로 Menu instance(object) 참조 (완료-2차)
    
    '''
    try:
        data = json.loads(request.body, object_pairs_hook=OrderedDict) 

        # request받은 id와 일치하는 전체 menu object
        menu_info = Menu.objects.filter(name=data['name']) 

        # request받은 id를 가지는 MenuToStock object의 'stock' value
        menu_stock = MenuToStock.objects.filter(menu__in=menu_info).values('stock') 

        # MenuToStock에 저장된 stock(id)를 통해 stock object 추출
        stock_info = Stock.objects.filter(id__in=menu_stock) 

        menu_list = []
        for apm, spm in zip(list(menu_stock.values_list('amount_per_menu')), list(stock_info.values_list('name'))):
            menu_list.append({
                "menu_name"        : list(menu_info.values_list('name'))[0][0],
                "menu_category"    : list(menu_info.values_list('category'))[0][0],
                "menu_price"       : list(menu_info.values_list('price'))[0][0],        
                "amount_per_menu"  : apm[0],
                "stock_per_menu"   : spm[0]        
            })

        global selected_menu; selected_menu = menu_info

    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=410)

    output_data = json.dumps(menu_list)
    output_data = json.loads(output_data, object_pairs_hook=OrderedDict) 
    return Response(output_data, status=200)
    
@api_view(['POST'])
def modifyMenu(request):
    '''
    메뉴 수정

    2021-11-27 1차
    
    - /post/modifyMenu/ 로 수정한 메뉴 정보가 넘어오면 DB 수정 (완료-1차)
    - 수정된 stock 정보가 기존 MenuToStock에 존재하지 않을 경우 새로운 instance(object) 생성 (완료-1차)
    - 기존 MenuToStock instance(object) 수정 (완료-1차)
    - 선택된 Menu instance(object)를 참조하기 위해 'getSelectedMenu'에서 global 변수 선언 (완료-1차)

    - 입력 오류에 대한 예외 처리는 포함하지 않음; front에서 처리할 예정 (1차)
    
    '''
    try:
        global selected_menu
        data = json.loads(request.body)
        
        # Menu 수정
        modify_menu = selected_menu.first()
        modify_menu.name = data['name']
        modify_menu.category = data['category']
        modify_menu.price = int(data['price'])
        modify_menu.save()

        stock = []
        amount = []
        for i in data['stock_list']:
            stock.append(i['stock_name'])
            amount.append(i['amount'])

        # MenuToStock 수정
        for st, amt in zip(stock, amount):
            modify_menu_to_stock = MenuToStock.objects.filter(Q(menu=modify_menu) & Q(stock=Stock.objects.get(name=st)))
            modify_menu_to_stock_id = modify_menu_to_stock.first().id

            ### 수정된 stock 정보가 기존 MenuToStock에 존재하지 않을 경우
            if not modify_menu_to_stock:
                # 기존 instance(object) 삭제
                modify_menu_to_stock.delete()

                # 새로운 instance(object) 생성
                MenuToStock.objects.create( 
                    id        = modify_menu_to_stock_id,
                    menu      = Menu.objects.get(name=data['name']),
                    stock     = Stock.objects.get(name=st),
                    amount_per_menu = int(amt)
                )
                continue
        
            ### 기존 MenuToStock instance(object) 수정
            modify_menu_to_stock = modify_menu_to_stock.first()
            modify_menu_to_stock.amount_per_menu = int(amt)
            modify_menu_to_stock.save()
            
        selected_menu = modify_menu

        return Response({'MESSAGE' : 'SUCCESS'}, status=200)  

    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=410)

@api_view(['POST'])
def deleteMenu(request):
    '''
    메뉴 삭제

    2021-11-27 1차
    
    - /post/deleteMenu/ 로 빈 request가 넘어오면 
      global로 선언된 Menu instance(object)를 참조하여 DB 수정 (완료-1차)
    - Menu instance(object) 삭제 (완료-1차)
    - MenuToStock instance(object) 삭제 (완료-1차)

    - 입력 오류에 대한 예외 처리는 포함하지 않음; front에서 처리할 예정 (1차)
    
    '''
    try:
        global selected_menu
        
        # MenuToStock 삭제
        MenuToStock.objects.filter(menu=selected_menu.first()).delete()

        # 선택된 Menu를 가진 Order 삭제
        Orders.objects.filter(menu=selected_menu.first()).delete()

        # Menu 삭제
        selected_menu.delete()

        return Response({'MESSAGE' : 'SUCCESS'}, status=200)   
        
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=410)

    