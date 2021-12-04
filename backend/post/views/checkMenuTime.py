import json
from collections import OrderedDict
from datetime import datetime

from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Menu, MenuTimer, Orders

@api_view(['POST'])
def showOrderMenu(request):
    '''
    주문된 메뉴들과 주문번호 반환

    2021-12-03 1차
    2021-12-04 1차 검수 (완료)
    '''
    try:
        menu = MenuTimer.objects.filter(end_time = None)
        if not menu.exists():
            return Response({'MESSAGE' : 'MENU_TIMER_IS_EMPTY'}, status=401)
        
        order_list = []
        menu_list = []
        for i in menu:
            menu_list.append(i.menu.name)
            order_list.append(i.order_id)
        
        output_data = []
        for mn, oid in zip(list(menu_list), list(order_list)):
            output_data.append({
                "menu_name" : mn,
                "order_id" : oid
            })

        output_data = json.dumps(output_data)
        output_data = json.loads(output_data, object_pairs_hook=OrderedDict)
        return Response(output_data, status=200)
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=410)

@api_view(['POST'])
def checkMenuTime(request):
    '''
    해당 메뉴의 준비 완료 버튼을 누르면 해당 메뉴의 메뉴 타이머의 end_time을 설정

    2021-12-03 1차
    2021-12-04 1차 검수 (완료)
    '''
    try:
        time_format = "%Y-%m-%d %H:%M:%S"
        current_time = datetime.now().strftime(time_format)
        
        data = json.loads(request.body)
        print(data)
        select_menu = MenuTimer.objects.filter(order_id = data['order_id'])
        ready_time = select_menu.get(menu = Menu.objects.get(name = data['name']))
        
        ready_time.end_time = current_time
        ready_time.save()
    
        return Response({'MESSAGE' : 'SUCCESS'}, status=200)
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)
