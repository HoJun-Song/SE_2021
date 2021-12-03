#browseMenu.py
from django.db.models.query import QuerySet
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import serializers, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from collections import OrderedDict
import json

from ..models import Staff
from .. import serializers

global selected_staff
selected_staff = None

@api_view(['POST'])
def browse(request):
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


    output_data = staff_list
    serialized_output_data = serializers.StaffSerializer(output_data, many=True)
    return Response(serialized_output_data.data, status=200)

@api_view(['POST'])
def detail(request):
    '''
    직원 프로필 열람 (선택한 직원)

    2021-11-27 1차
    2021-12-03 2차
    
    - /post/detailStaffProfile/ 로 선택한 Staff의 id가 넘어오면 전체 직원 반환 (완료-1차)
    - staff_id, name, phone_num만 반환 (완료-2차)

    '''
    try:
        data = json.loads(request.body)

        # request받은 id와 일치하는 Staff instance(object)
        staff_info = Staff.objects.filter(staff_id=data['staff_id'])

        if not staff_info.exists():
            return Response({'MESSAGE' : 'STAFF_ID_NOT_EXISTS'}, status=420)   

        global selected_staff; selected_staff = staff_info
    
    except KeyError:
        JsonResponse({'MESSAGE' : 'KEY_ERROR'}, status=410)

    staff_info = staff_info.first()
    output_data = {
        "staff_id" : staff_info.staff_id,
        "name" : staff_info.name,
        "phone_num" : staff_info.phone_num
    }
    output_data = json.dumps(output_data)
    output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
    return Response(output_data, status=200)

@api_view(['POST'])
def modify(request):
    '''
    직원 프로필 수정

    2021-11-27 1차
    
    - /post/modifyStaffProfile/ 로 수정한 Staff 정보가 넘어오면 DB 수정 (완료-1차)
    
    '''
    try:
        global selected_staff
        data = json.loads(request.body)
        
        modify_staff = selected_staff.first()
        modify_staff.name = data['name']
        modify_staff.staff_id = data['staff_id']
        modify_staff.staff_pw = data['staff_pw']
        modify_staff.phone_num = data['phone_num']
        modify_staff.save()
        
        # if not data.exists():
        #     return JsonResponse({'MESSAGE' : 'STAFF_TABLE_IS_EMPTY'}, status=400)

    except KeyError:
        JsonResponse({'MESSAGE' : 'KEY_ERROR'}, status=410)

    return Response({'MESSAGE' : 'SUCCESS'}, status=200)   

@api_view(['POST'])
def delete(request):
    '''
    직원 프로필 삭제

    2021-11-27 1차
    
    - /post/deleteStaffProfile/ 로 빈 request가 넘어오면 global로 선언된 Staff instance(object)를 참조하여 DB 수정 (완료-1차)
    - Staff instance(object) 삭제 (완료-1차)

    '''
    try:
        global selected_staff

        delete_staff = selected_staff.first()
        delete_staff.delete()

    except KeyError:
        JsonResponse({'MESSAGE' : 'KEY_ERROR'}, status=410)

    return Response({'MESSAGE' : 'SUCCESS'}, status=200)   
