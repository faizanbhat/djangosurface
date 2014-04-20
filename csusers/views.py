from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.core.context_processors import csrf
from django.shortcuts import render
from csusers.models import CSUser
from videos.models import Site, Video
from django.shortcuts import get_object_or_404


# Create your views here.

from rest_framework import viewsets
from djangosurface.serializers import CSUserSerializer

class CSUserViewSet(viewsets.ModelViewSet):
    queryset = CSUser.objects.all()
    serializer_class = CSUserSerializer    

def create_user(request,site_id):
    site = get_object_or_404(Site, pk=int(site_id))        
    u = CSUser(site=site)
    v = Video.objects.filter(site=site)[:5]
    u.save()
    u.playlist = v
    u.save()
    return HttpResponseRedirect("/users/"+str(u.id))    
    
def played(request,user_id,video_id):
    user = get_object_or_404(CSUser, pk=int(user_id))
    video = get_object_or_404(Video, pk=int(video_id))
    user.last_played = video
    user.plays.add(video)
    user.save()
    return HttpResponse("200 OK")
    
def liked(request,user_id,video_id):
    user = get_object_or_404(CSUser, pk=int(user_id))
    video = get_object_or_404(Video, pk=int(video_id))
    user.likes.add(video)
    user.save()
    return HttpResponse("200 OK")
    
def skipped(request,user_id,video_id):
    user = get_object_or_404(CSUser, pk=int(user_id))
    video = get_object_or_404(Video, pk=int(video_id))
    user.skips.add(video)
    user.save()
    return HttpResponse("200 OK")