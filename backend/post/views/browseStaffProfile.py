#browseMenu.py
from django.db.models.query import QuerySet
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import serializers, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

# from ..serializers import MenuSerializer
from ..models import Staff
from .. import serializers

@api_view(['POST'])
def post(request):
    '''
    직원 프로필 열람 

    2021-11-20 1차
    
    - /post/browseStaffProfile/ 로 빈 request가 넘어오면 전체 직원 반환 (완료-1차)
    
    '''
    try:
        staff_list = Staff.objects.all()

        if not staff_list.exists():
            return JsonResponse({'MESSAGE' : 'STAFF_TABLE_IS_EMPTY'}, status=400)
    
    except KeyError:
        JsonResponse({'MESSAGE' : 'KEY_ERROR'}, status=410)


    output_data = staff_list #.only('name')
    serialized_output_data = serializers.StaffSerializer(output_data, many=True)

    return Response(serialized_output_data.data, status=200)


    

