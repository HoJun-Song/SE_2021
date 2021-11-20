from django.db.models.query import QuerySet
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import serializers, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

from ..serializers import MenuSerializer
from ..models import Menu

class createMenuAPI(generics.GenericAPIView):
    def post(self, request):
        try:
            data = json.loads(request.body)

            if data['id'] < 1:
                return JsonResponse({'MESSAGE' : 'INVALID_ID_VALUE'}, status=400)
            if len(data['name']) > 50 or len(data['category']) > 30:
                return JsonResponse({'MESSAGE' : 'DATA_TOO_LONG'}, status=410)
            if data['price'] < 0:
                return JsonResponse({'MESSAGE' : 'INVALID_PRICE'}, status=400)

            Menu.objects.create(
                id        = data['id'],
                name      = data['name'],
                category  = data['category'],
                price     = data['price']
            )
        
        except json.decoder.JSONDecodeError:
            return JsonResponse({'MESSAGE' : 'REQUEST_WITHOUT_DATA'}, status=400)

        except KeyError:
            JsonResponse({'MESSAGE' : 'KEY_ERROR'}, status=400)
        
        return Response({'MESSAGE' : 'SUCCESS'}, status=200)
