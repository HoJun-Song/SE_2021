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
from ..models import Staff

@api_view(['POST'])
def create(request):
    '''
    새로운 Staff 생성

    2021-11-27 1차

    - /post/createStaffProfile/ 로 새로운 Staff의 정보가 넘어오면 Staff instance(object)를 생성하여 DB에 저장 (완료-1차)
    - ID값을 입력받지 않고 table의 instance 개수 파악 후 자동 증가 (완료-1차)

    - 입력 오류에 대한 예외 처리는 포함하지 않음; front에서 처리할 예정 (1차)
    
    '''
    
    # Staff id 자동 생성
    if not Staff.objects.exists():
        staff_id = 0
    else:
        max_id = Staff.objects.aggregate(id = Max('id'))
        staff_id = max_id['id']
    
    try:
        data = json.loads(request.body)
        
        # Staff instance(object) 생성 (DB 저장)
        Staff.objects.create(
            id        = staff_id + 1,
            name      = data['name'],
            staff_id  = data['staff_id'],
            staff_pw  = data['staff_pw'],
            phone_num = data['phone_num'],
        )
    
    except json.decoder.JSONDecodeError:
        return JsonResponse({'MESSAGE' : 'REQUEST_WITHOUT_DATA'}, status=410)

    except KeyError:
        JsonResponse({'MESSAGE' : 'KEY_ERROR'}, status=410)
    
    return Response({'MESSAGE' : 'SUCCESS'}, status=200)
