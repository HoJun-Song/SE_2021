#browseMenu.py
from django.db.models.query import QuerySet
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import serializers, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

# from ..serializers import MenuSerializer
from ..models import Menu, MenuToStock, Stock
from .. import serializers

@api_view(['POST'])
def post(request):
    '''
    메뉴 열람

    2021-11-20 1차
    
    - /post/browseMenu/ 로 빈 request가 넘어오면 전체 메뉴 반환 (완료-1차)
    
    - MenuToStock, Stock table 묶어서 반환 (미완료)
    '''
    try:
        menu_list = Menu.objects.all()

        if not menu_list.exists():
            return JsonResponse({'MESSAGE' : 'MENU_TALBE_IS_EMPTY'}, status=400)
    
    except KeyError:
        JsonResponse({'MESSAGE' : 'KEY_ERROR'}, status=410)


    output_data = menu_list #.only('id', 'name')
    serialized_output_data = serializers.MenuSerializer(output_data, many=True)
    return Response(serialized_output_data.data, status=200)


    

