#browseMenu.py
from django.db.models.query import QuerySet
from django.shortcuts import render
from django.db.models import Max
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

# from ..serializers import MenuSerializer
from ..models import Stock, MenuToStock, Menu
from .. import serializers
from collections import OrderedDict

global selected_stock
selected_stock = None

global order_stock_list
order_stock_list = []
global total_stock_price
total_stock_price = 0

@api_view(['POST'])
def browse(request):
    '''
    재고 열람 

    2021-11-20 1차
    
    - /post/browseStock/ 로 빈 request가 넘어오면 전체 재고 반환 (완료-1차)
    
    '''
    try:
        stock_list = Stock.objects.all()

        if not stock_list.exists():
            return Response({'MESSAGE' : 'STOCK_IS_EMPTY'}, status=401)
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)


    output_data = stock_list
    serialized_output_data = serializers.StockSerializer(output_data, many=True)
    return Response(serialized_output_data.data, status=200)

@api_view(['POST'])
def detail(request):
    '''
    특정 재고 열람

    2021-11-20 1차
    
    - /post/detail/ 로 특정 재고를 선택해서 전달받으면 해당 재고 정보 반환
    '''
    try:
        data = json.loads(request.body)
        
        if not Stock.objects.filter(name = data["name"]).exists():
            return Response({'MESSAGE' : 'STOCK_IS_NOT_EXIST'}, status=401)
        
        detail_stock = Stock.objects.get(name = data['name'])
        amount_list = MenuToStock.objects.filter(stock = detail_stock.id)
        menu_name = Menu.objects.filter(id__in = amount_list.values('menu')).values_list('name')
        
        output_data = {
            'name' : detail_stock.name,
            'unit' : detail_stock.unit,
            'price' : detail_stock.price,
            'menu_name' : [i[0] for i in list(menu_name)],
            'amount_per_menu' : [i[0] for i in list(amount_list.values_list('amount_per_menu'))]
        }
        
        global selected_stock
        selected_stock = detail_stock
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    output_data = json.dumps(output_data)
    output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
    return Response(output_data, status=200)

@api_view(['POST'])
def create(request):
    '''
    재고 등록 

    2021-11-23 1차
    
    - 재고 이름, 재고 단위, 단위 당 가격, 메뉴별 재고 사용량을 입력받아 DB에 저장
    - 재고 등록에서 재고 사용량 부분 제외 ==> 메뉴에서만 이를 수정 하도록 연동
    '''
    if not Stock.objects.exists():
        id = 0
    else:
        max_id = Stock.objects.aggregate(id = Max('id'))
        id = max_id['id']
    
    try:
        data = json.loads(request.body)
        
        if Stock.objects.filter(name = data["name"]).exists():
            return Response({'MESSAGE' : 'STOCK_IS_ALREADY_EXIST'}, status=401)
        if len(data['name']) > 30 or len(data['unit']) > 10:
            return Response({'MESSAGE' : 'DATA_TOO_LONG'}, status=402)
        if int(data['price']) < 0:
            return Response({'MESSAGE' : 'INVALID_PRICE'}, status=403)

        Stock.objects.create(
            id = id + 1,
            name = data['name'],
            unit = data['unit'],
            amount = 0,
            price = data['price'],
        )
    
    except json.decoder.JSONDecodeError:
        return Response({'MESSAGE' : 'REQUEST_WITHOUT_DATA'}, status=400)

    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)
    
    return Response({'MESSAGE' : 'SUCCESS'}, status=200)

@api_view(['POST'])
def delete(request):
    '''
    재고 삭제 

    2021-11-23 1차
    
    - 재고 수정화면에서 삭제버튼 클릭시 해당 이름 데이터 삭제
    '''
    try:
        global selected_stock
        Stock.objects.filter(name = selected_stock.name).delete()
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    return Response({'MESSAGE' : 'SUCCESS'}, status=200)

@api_view(['POST'])
def modify(request):
    '''
    재고 수정 

    2021-11-23 1차
    
    - 재고 수정화면에서 내용 수정 후 수정 버튼을 누르면 데이터 업데이트
    '''
    try:
        global selected_stock
        data = json.loads(request.body)
        
        if Stock.objects.filter(name = data["name"]).count() > 1:
            return Response({'MESSAGE' : 'STOCK_IS_ALREADY_EXIST'}, status=401)
        if len(data['name']) > 30 or len(data['unit']) > 10:
            return Response({'MESSAGE' : 'DATA_TOO_LONG'}, status=402)
        if data['price'] < 0:
            return Response({'MESSAGE' : 'INVALID_PRICE'}, status=403)
        
        modify_stock = selected_stock
        modify_stock.name = data['name']
        modify_stock.unit = data['unit']
        modify_stock.price = data['price']
        modify_stock.save()
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    return Response({'MESSAGE' : 'SUCCESS'}, status=200)

@api_view(['POST'])
def orderStock(request):
    '''
    재고 주문 
    2021-11-29 1차
    
    - +, - 버튼 눌를 때마다 총 계산 가격 및 주문 정보 저장
    '''
    try:
        flag = 0
        global order_stock_list
        global total_stock_price
        data = json.loads(request.body)
        stock_name = Stock.objects.get(name = data['name']).name
        stock_price = Stock.objects.get(name = data['name']).price
        max = len(order_stock_list)
        for i in order_stock_list:
            if max == 0:
                break
            
            if i[0] == stock_name:
                i[1] = int(i[1]) + int(data['amount'])
                i[2] = int(i[2]) + (data['amount'] / 10) * stock_price
                flag = 1
                break
        
        if flag == 0:
            order_stock = stock_name
            order_amount = data['amount']
            order_price = int(data['amount'] / 10) * stock_price
            order_stock_list.append(list([order_stock, order_amount, order_price]))
              
        total_stock_price = 0
        for i in order_stock_list:
            total_stock_price = total_stock_price + i[2]
        
    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    output_data = {
        'total_stock_price' : total_stock_price
    }
    
    output_data = json.dumps(output_data)
    output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
    return Response(output_data, status=200)

@api_view(['POST'])
def finishStock(request):
    '''
    재고 주문 선택 완료 

    2021-11-29 1차
    
    - 재고 주문에서 수량에 따라 총 금액을 계산하여 전달해주고, 주문 완료 시 재고량 증가
    '''
    try:
        global order_stock_list
        global total_stock_price
        for i in order_stock_list:
            order_stock = Stock.objects.get(name = i[0])
            order_stock.amount = order_stock.amount + int(i[1])
            order_stock.save()
        
    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    ouput_data = {
        'name' : [i[0] for i in order_stock_list],
        'amount' :  [i[1] for i in order_stock_list],
        'price' : [i[2] for i in order_stock_list],
        'total_price' : total_stock_price
    }
    output_data = json.dumps(ouput_data)
    output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
    return Response(output_data, status=200)


    

