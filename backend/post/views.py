from django.db.models.query import QuerySet
from django.shortcuts import render
from .models import name

def name_view(request):
    names = name.objects.all()
    return render(request, 'index.html',{"names": names})
# Create your views here.
