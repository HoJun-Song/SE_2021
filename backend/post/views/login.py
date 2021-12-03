import json
from django.shortcuts import render
from django.core.serializers import serialize
from rest_framework import generics
from rest_framework.response import Response
from ..models import Staff
from .. import serializers
from rest_framework.decorators import api_view

@api_view(['POST'])
def loginManager(request):
    '''
    매니저 로그인
    2021-11-27 검수 1차 완료
    '''
    try:
        data = json.loads(request.body)
        manager_id = "admin"
        manager_pw = "1q2w3e4r"

        if manager_id != data['id'] or manager_pw != data['password']:
            return Response({'MESSAGE' : 'id 혹은 password가 다릅니다.'}, status=401)

    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    output_data = {"id" : manager_id, "password" : manager_pw}
    print(output_data)
    return Response(output_data, status=200)

@api_view(['POST'])
def loginStaff(request):
    '''
    직원 로그인
    2021-11-27 검수 1차 완료
    '''
    try:
        data = json.loads(request.body)

        # id 존재하지 않는 경우
        if not Staff.objects.filter(staff_id=data['staff_id']).exists():
            return Response({'MESSAGE' : 'id가 존재하지 않습니다.'}, status=402)

        login_user = Staff.objects.get(staff_id=data['staff_id'])

        # pw 다른 경우
        if login_user.staff_pw != data['staff_pw']:
            return Response({'MESSAGE' : 'password가 다릅니다.'}, status=401)

    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    output_data = login_user
    serialized_output_data = serializers.StaffSerializer(output_data)
    return Response(serialized_output_data.data, status=200)

@api_view(['POST'])
def findPW(request):
    '''
    직원 비밀번호 찾기
    2021-11-27 검수 예정
    '''
    try:
        input_data = json.loads(request.body)
        pw_user = Staff.objects.get(staff_id=input_data['staff_id'])

        # if not pw_user.exists():
        #     return Response({'MESSAGE' : '존재하지 않는 id입니다.'}, status=401)
        # elif pw_user[0].name != input_data['name']:
        #     return Response({'MESSAGE' : '존재하지 않는 이름입니다.'}, status = 402)
        # elif pw_user[0].phone_num != input_data['phone_num']:
        #     return Response({'MESSAGE' : '존재하지 않는 전화번호입니다.'}, status = 403)
        
        output_data = pw_user
        serialized_output_data = serializers.StaffSerializer(output_data)
        
    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    return Response(serialized_output_data.data, status=200)