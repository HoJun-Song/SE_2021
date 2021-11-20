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
    '''
    try:
        data = json.loads(request.body)
        print(type(data))
        login_user = Staff.objects.filter(staff_id=data['staff_id'])
        print(login_user)

        if not login_user.exists() or login_user[0].staff_pw != data['staff_pw']:
            return Response({'MESSAGE' : 'id 혹은 password가 다릅니다.'}, status=401)

    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    output_data = login_user.all()
    print(output_data)
    serialized_output_data = serializers.StaffSerializer(output_data, many=True)
    print(serialized_output_data)
    return Response(serialized_output_data.data, status=200)

@api_view(['POST'])
def findPW(request):
    '''
    비밀번호 찾기
    '''
    try:
        input_data = json.loads(request.body)
        print(input_data)
        pw_user = Staff.objects.filter(staff_id=input_data['staff_id'])

        if not pw_user.exists():
            return Response({'MESSAGE' : '존재하지 않는 id입니다.'}, status=401)
        elif pw_user[0].name != input_data['name']:
            return Response({'MESSAGE' : '존재하지 않는 이름입니다.'}, status = 402)
        elif pw_user[0].phone_num != input_data['phone_num']:
            return Response({'MESSAGE' : '존재하지 않는 전화번호입니다.'}, status = 403)
        
        #output_data = serializers.StaffEncoder.serialize(pw_user)
        #print(output_data)
        
        output_data = pw_user.all()
        print(output_data)
        serialized_output_data = serializers.StaffSerializer(output_data, many=True)
        print(serialized_output_data)
        

    except KeyError:
        return Response({'MESSAGE' : 'KEY_ERROR'}, status=400)

    #return JsonResponse(output_data, safe = False, status = 200)
    return Response(serialized_output_data.data, status=200)
    #return HttpResponse(output_data, content_type="text/json-comment-filtered")


'''
# Create your views here.
class ListMenu(generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
class DetailMenu(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    
class ListMenuTimer(generics.ListCreateAPIView):
    queryset = MenuTimer.objects.all()
    serializer_class = MenuTimerSerializer
class DetailMenuTimer(generics.RetrieveUpdateDestroyAPIView):
    queryset = MenuTimer.objects.all()
    serializer_class = MenuTimerSerializer
    
class ListMenuToStock(generics.ListCreateAPIView):
    queryset = MenuToStock.objects.all()
    serializer_class = MenuToStockSerializer
class DetailMenuToStock(generics.RetrieveUpdateDestroyAPIView):
    queryset = MenuToStock.objects.all()
    serializer_class = MenuToStockSerializer
    
class ListOrderTimer(generics.ListCreateAPIView):
    queryset = OrderTimer.objects.all()
    serializer_class = OrderTimerSerializer
class DetailOrderTimer(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrderTimer.objects.all()
    serializer_class = OrderTimerSerializer
    
class ListOrders(generics.ListCreateAPIView):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer
class DetailOrders(generics.RetrieveUpdateDestroyAPIView):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer

class ListStaff(generics.ListCreateAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
class DetailStaff(generics.RetrieveUpdateDestroyAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

class ListStock(generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = StockSerializer
class DetailStock(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = StockSerializer

class ListTables(generics.ListCreateAPIView):
    queryset = Tables.objects.all()
    serializer_class = TablesSerializer
class DetailTables(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tables.objects.all()
    serializer_class = TablesSerializer
'''