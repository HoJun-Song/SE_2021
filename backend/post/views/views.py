import json
from django.http import JsonResponse
from django.views import View
from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from ..models import Staff

#from .models import *
from ..serializers import (LoginSerializer, StaffSerializer)

class LoginAPI(generics.GenericAPIView):
    def post(self, request):
        try:
            data = json.loads(request.body)
            print(data)
            login_user = Staff.objects.filter(staff_id=data['staff_id'])

            if not login_user.exists() or login_user[0].staff_pw != data['staff_pw']:
                return JsonResponse({'MESSAGE' : 'INVALID_USER'}, status=401)

        except KeyError:
            return JsonResponse({'MESSAGE' : 'KEY_ERROR'}, status=400)

        return JsonResponse({'MESSAGE' : 'SUCCESS'}, status=200)
        

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