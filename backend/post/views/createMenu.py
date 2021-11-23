#createMenu.py
from django.db.models.query import QuerySet
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import serializers, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

# from ..serializers import MenuSerializer
from ..models import Menu, MenuToStock, Stock

@api_view(['POST'])
def post(request):
    '''
    새로운 메뉴 생성

    2021-11-19 1차
    2021-11-20 2차

    - 메뉴이름, 가격, 카테고리를 입력받아 DB에 저장 (완료-1차)
    - 재고이름, 메뉴당재고를 입력받아 DB에 저장 (완료-2차)
    - 메뉴-재고 연동 (완료-2차)

    - ID값을 입력받지 않고 table의 instance 개수 파악 후 자동 증가 (미완료)
    - 추가되는 재고 개수만큼 MenuToStock 객체 증가 (미완료)
    '''
    try:
        data = json.loads(request.body)

        if data['id'] < 1:
            return JsonResponse({'MESSAGE' : 'INVALID_ID_VALUE'}, status=400)
        if len(data['name']) > 50 or len(data['category']) > 30:
            return JsonResponse({'MESSAGE' : 'DATA_TOO_LONG'}, status=400)
        if data['price'] < 0:
            return JsonResponse({'MESSAGE' : 'INVALID_PRICE'}, status=400)
        if not Stock.objects.filter(name=data['stock_name']).exists():
            return JsonResponse({'MESSAGE' : 'INVALID_STOCK_NAME'}, status=400)

        Menu.objects.create(
            id        = data['id'],
            name      = data['name'],
            category  = data['category'],
            price     = data['price'],
        )
        MenuToStock.objects.create(
            id        = 2,
            menu      = Menu.objects.get(name=data['name']),
            stock     = Stock.objects.get(name=data['stock_name']),
            amount_per_menu = data['amount']
        )
    
    except json.decoder.JSONDecodeError:
        return JsonResponse({'MESSAGE' : 'REQUEST_WITHOUT_DATA'}, status=410)

    except KeyError:
        JsonResponse({'MESSAGE' : 'KEY_ERROR'}, status=410)
    
    return Response({'MESSAGE' : 'SUCCESS'}, status=200)
