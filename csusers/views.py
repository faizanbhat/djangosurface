from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.core.context_processors import csrf
from django.shortcuts import render
from csusers.models import CSUser, Order, CSUserPlaylist
from videos.models import Site, Video
from django.shortcuts import get_object_or_404
from recommender.managers import RecommenderManager as RM
import pdb

# Create your views here.

from rest_framework import viewsets
from djangosurface.serializers import CSUserSerializer

class CSUserViewSet(viewsets.ModelViewSet):
    queryset = CSUser.objects.all()
    serializer_class = CSUserSerializer    

def create_user(request,site_id):
    # pdb.set_trace()
    site = get_object_or_404(Site, pk=int(site_id))        
    u = CSUser(site=site)
    initial_videos = Video.objects.filter(site=site)[:5]
    pl = CSUserPlaylist()
    pl.save()
    for v in initial_videos:
        Order.objects.create(pl=pl,v=v,similarity=0.0)
    u.playlist = pl
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
    for tag in video.tags.all():
        user.tags.add(tag)
    user.save()
    
    rm = RM()
    recs = rm.get_content_based_recs(user,Video.objects.all())
    
    return HttpResponse(recs)
    
def skipped(request,user_id,video_id):
    user = get_object_or_404(CSUser, pk=int(user_id))
    video = get_object_or_404(Video, pk=int(video_id))
    user.skips.add(video)
    user.save()
    user.playlist.remove(video)
    # for tag in video.tags.all()
    #     user.tags.remove(tag)
    return HttpResponse("200 OK")
    
def completed(request,user_id,video_id):
    user = get_object_or_404(CSUser, pk=int(user_id))
    video = get_object_or_404(Video, pk=int(video_id))
    user.skips.add(video)
    user.save()
    user.playlist.remove(video)
    return HttpResponse("200 OK")
