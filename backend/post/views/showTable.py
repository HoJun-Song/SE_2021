#browseMenu.py
from django.db.models.query import QuerySet
from rest_framework import serializers, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

# from ..serializers import MenuSerializer
from ..models import Tables
from .. import serializers

@api_view(['POST'])
def showTable(request):
    '''
    테이블 열람
    '''
    try:
        table_list = Tables.objects.all()

        if not table_list.exists():
            return Response({'MESSAGE' : 'TABLE_IS_EMPTY'}, status=401)
    
    except KeyError:
        Response({'MESSAGE' : 'KEY_ERROR'}, status=400)


    output_data = table_list
    print(list(output_data))
    serialized_output_data = serializers.TablesSerializer(output_data, many=True)
    return Response(serialized_output_data.data, status=200)


    
