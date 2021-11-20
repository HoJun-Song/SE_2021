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

class browseMenuAPI(generics.GenericAPIView):
    def post(self, request):
        '''
        메뉴 열람

        2021-11-19 1차
        2021-11-20 2차

        - 메뉴이름, 가격, 카테고리를 입력받아 DB에 저장 (완료-1차)
        - 재고이름, 메뉴당재고를 입력받아 DB에 저장 (완료-2차)
        - 메뉴-재고 연동 (완료-2차)

        - ID값을 입력받지 않고 table의 instance 개수 파악 후 자동 증가 (미완료)
        - 추가되는 재고 개수만큼 MenuToStock 객체 증가 (미완료)
        '''
     
