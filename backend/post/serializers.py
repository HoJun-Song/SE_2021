from rest_framework import serializers
from .models import Menu, MenuTimer, MenuToStock, OrderTimer, Orders, Staff, Stock, Tables

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'category',
            'price'
        )
        model = Menu

class MenuTimerSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'menu',
            'start_time',
            'end_time'
        )
        model = MenuTimer

class MenuToStockSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'menu',
            'stock'
        )
        model = MenuToStock
        
class OrderTimerSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'start_time',
            'end_time',
            'order'
        )
        model = OrderTimer
        
class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'amount',
            'order_id',
            'menu'
        )
        model = Orders
        
class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'staff_id',
            'staff_pw',
            'name',
            'phone_num',
            'order'
        )
        model = Staff
        
class StockSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'unit',
            'amount',
            'price'
        )
        model = Stock
        
class TablesSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'order'
        )
        model = Tables