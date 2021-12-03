#browseMenu.py
import json
from collections import OrderedDict

from django.db.models import Max
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .. import serializers
from ..models import Menu, MenuToStock, Stock

global selected_stock
selected_stock = None
global order_stock_list
order_stock_list = []
global total_stock_price
total_stock_price = 0

@api_view(['POST'])
def browse(request):
    '''
    재고 추적 버튼 클릭 시 재고 현황 출력

    2021-11-20 1차
    2021-12-04 1차 검수 (완료)
    '''
    try:
        stock_list = Stock.objects.all()
        
        output_data = stock_list
        serialized_output_data = serializers.StockSerializer(output_data, many=True)
        return Response(serialized_output_data.data, status=200)
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

@api_view(['POST'])
def detail(request):
    '''
    특정 재고 선택 시 해당 재고 정보 출력

    2021-11-20 1차
    2021-12-04 1차 검수 (완료)
    '''
    try:
        global selected_stock
        data = json.loads(request.body)
        
        if not Stock.objects.filter(name = data["name"]).exists():
            return Response({'MESSAGE' : 'STOCK_IS_NOT_EXIST'}, status=401)
        
        detail_stock = Stock.objects.get(name = data['name'])
        amount_list = MenuToStock.objects.filter(stock = detail_stock.id)
        menu_name = Menu.objects.filter(id__in = amount_list.values('menu')).values_list('name')
        selected_stock = detail_stock
        
        output_data = []
        for mn, amt in zip(list(menu_name), list(amount_list.values_list('amount_per_menu'))):
            output_data.append({
                'name' : detail_stock.name,
                'unit' : detail_stock.unit,
                'price' : detail_stock.price,
                'menu_name' : mn[0],
                'amount_per_menu' : amt[0]
            })

        output_data = json.dumps(output_data)
        output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
        return Response(output_data, status=200)
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

@api_view(['POST'])
def create(request):
    '''
    재고에 필요한 정보를 입력받고 재고 객체 생성

    2021-11-23 1차
    2021-12-04 1차 검수 (완료)
    '''    
    try:
        if not Stock.objects.exists():
            id = 0
        else:
            max_id = Stock.objects.aggregate(id = Max('id'))
            id = max_id['id']
        
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

        return Response({'MESSAGE' : 'SUCCESS'}, status=200)

    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

@api_view(['POST'])
def delete(request):
    '''
    특정 재고 선택 후 해당 재고를 디비에서 삭제

    2021-11-23 1차
    2021-12-04 1차 검수 (완료)
    '''
    try:
        global selected_stock
        Stock.objects.filter(name = selected_stock.name).delete()
        
        return Response({'MESSAGE' : 'SUCCESS'}, status=200)
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

@api_view(['POST'])
def modify(request):
    '''
    재고 수정에 필요한 정보를 입력받고 해당 재고 정보 수정

    2021-11-23 1차
    2021-12-04 1차 검수 (완료)
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

        return Response({'MESSAGE' : 'SUCCESS'}, status=200)
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

@api_view(['POST'])
def orderStock(request):
    '''
    재고 주문 +, - 버튼 클릭 시 총 가격 계산해서 출력
    
    2021-11-29 1차
    2021-12-04 1차 검수 (완료)
    '''
    try:
        global order_stock_list
        global total_stock_price
        
        data = json.loads(request.body)
        stock_name = Stock.objects.get(name = data['name']).name
        stock_price = Stock.objects.get(name = data['name']).price
        
        flag = 0
        max = len(order_stock_list)
        for i in order_stock_list:
            if max == 0:
                break
            
            if i[0] == stock_name:
                i[1] = int(i[1]) + int(data['amount'])
                i[2] = int(i[2]) + (data['amount'] // 10) * stock_price
                flag = 1
                break
        
        if flag == 0:
            order_stock = stock_name
            order_amount = data['amount']
            order_price = int(data['amount'] // 10) * stock_price
            order_stock_list.append(list([order_stock, order_amount, order_price]))
            
        total_stock_price = 0
        for i in order_stock_list:
            total_stock_price = total_stock_price + i[2]
            
        output_data = {
            'total_stock_price' : total_stock_price
        }
        output_data = json.dumps(output_data)
        output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
        return Response(output_data, status=200)    
        
    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

@api_view(['POST'])
def finishStock(request):
    '''
    재고 주문 선택 완료 시 필요한 객체 수정 및 DB갱신 후 출력에 필요한 정보 출력

    2021-11-29 1차
    2021-12-04 1차 검수 (완료)
    '''
    try:
        global order_stock_list
        global total_stock_price
        
        for i in order_stock_list:
            order_stock = Stock.objects.get(name = i[0])
            order_stock.amount = order_stock.amount + int(i[1])
            order_stock.save()
            
        output_data = []
        for i in range(len(order_stock_list)):
            dic_data = {
                'name' : order_stock_list[i][0],
                'amount' : order_stock_list[i][1],
                'price' : order_stock_list[i][2],
                'total_price' : total_stock_price
            }
            output_data.append(dic_data)
        
        output_data = json.dumps(output_data)
        output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
        return Response(output_data, status=200)
    
    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)
