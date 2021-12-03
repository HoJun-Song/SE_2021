import json

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .. import serializers
from ..models import Staff

@api_view(['POST'])
def loginManager(request):
    '''
    매니저 로그인
    
    2021-12-04 검수 2차 (완료)
    '''
    try:
        data = json.loads(request.body)
        manager_id = "admin"
        manager_pw = "1q2w3e4r"

        if manager_id != data['id'] or manager_pw != data['password']:
            return Response({'MESSAGE' : 'id 혹은 password가 다릅니다.'}, status=401)

        return Response({'MESSAGE' : 'SUCCESS'}, status=200)

    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

@api_view(['POST'])
def loginStaff(request):
    '''
    직원 로그인
    
    2021-12-04 검수 2차 (완료)
    '''
    try:
        data = json.loads(request.body)

        # id 존재하지 않는 경우
        if not Staff.objects.filter(staff_id=data['staff_id']).exists():
            return Response({'MESSAGE' : 'id가 존재하지 않습니다.'}, status=401)

        login_user = Staff.objects.get(staff_id=data['staff_id'])

        # pw 다른 경우
        if login_user.staff_pw != data['staff_pw']:
            return Response({'MESSAGE' : 'password가 다릅니다.'}, status=402)
        
        return Response({'MESSAGE' : 'SUCCESS'}, status=200)

    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

@api_view(['POST'])
def findPW(request):
    '''
    직원 비밀번호 찾기
    
    2021-12-04 2차 검수 (완료)
    '''
    try:
        data = json.loads(request.body)
        pw_user = Staff.objects.get(staff_id=data['staff_id'])
        
        output_data = pw_user
        serialized_output_data = serializers.StaffSerializer(output_data)
        return Response(serialized_output_data.data, status=200)
        
    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)
