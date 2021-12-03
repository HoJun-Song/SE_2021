#createMenu.py
from django.db.models.query import QuerySet
from django.http.response import JsonResponse
from django.shortcuts import render
from django.db.models import Max
from rest_framework import serializers, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

# from ..serializers import MenuSerializer
from ..models import Menu, MenuToStock, Stock

@api_view(['POST'])
def createMenu(request):
    '''
    새로운 메뉴 생성

    2021-11-19 1차
    2021-11-20 2차
    2021-11-27 3차

    - 메뉴이름, 가격, 카테고리를 입력받아 DB에 저장 (완료-1차)
    - 재고이름, 메뉴당재고를 입력받아 DB에 저장 (완료-2차)
    - 메뉴-재고 연동 (완료-2차)
    - 추가되는 재고 개수만큼 MenuToStock 객체 증가 (완료-3차)
    - ID값을 입력받지 않고 table의 instance 개수 파악 후 자동 증가 (완료-3차)

    - 입력 오류에 대한 예외 처리는 포함하지 않음; front에서 처리할 예정 (3차)
    
    '''
    
    # Menu id 자동 생성
    if not Menu.objects.exists():
        menu_id = 0
    else:
        max_id = Menu.objects.aggregate(id = Max('id'))
        menu_id = max_id['id']

    # MenuToStock id 자동 생성
    if not MenuToStock.objects.exists():
        menu_to_stock_id = 0
    else:
        max_id = MenuToStock.objects.aggregate(id = Max('id'))
        menu_to_stock_id = max_id['id']
    
    try:
        data = json.loads(request.body)

        # Menu instance(object)는 하나만 생성
        Menu.objects.create(
            id        = menu_id + 1,
            name      = data['name'],
            category  = data['category'],
            price     = int(data['price']),
        )

        # 입력받은 만큼 Stock instance(object) 생성
        for i, (st, amt) in enumerate(zip(data['stock'], data['amount'])):
            MenuToStock.objects.create(
                id        = menu_to_stock_id + i + 1,
                menu      = Menu.objects.get(name=data['name']),
                stock     = Stock.objects.get(name=st),
                amount_per_menu = int(amt)
            )
    
    except json.decoder.JSONDecodeError:
        return JsonResponse({'MESSAGE' : 'REQUEST_WITHOUT_DATA'}, status=410)

    except KeyError:
        JsonResponse({'MESSAGE' : 'KEY_ERROR'}, status=410)
    
    return Response({'MESSAGE' : 'SUCCESS'}, status=200)
