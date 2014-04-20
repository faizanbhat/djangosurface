from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.core.context_processors import csrf

from django.shortcuts import render
from csusers.models import CSUser

# Create your views here.

from rest_framework import viewsets
from djangosurface.serializers import CSUserSerializer

class CSUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CSUser.objects.all()
    serializer_class = CSUserSerializer
    

def create_user(request):
        