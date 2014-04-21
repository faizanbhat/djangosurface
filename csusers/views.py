from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.core.context_processors import csrf
from django.shortcuts import render
from csusers.models import CSUser, PlaylistVideo, CSUserPlaylist
from videos.models import Site, Video
from django.shortcuts import get_object_or_404
from recommender.managers import RecommenderManager
import pdb
from django.db.models import Q


# Create your views here.

from rest_framework import viewsets
from djangosurface.serializers import CSUserSerializer, CSUserPlaylistSerializer

class CSUserViewSet(viewsets.ModelViewSet):
    queryset = CSUser.objects.all()
    serializer_class = CSUserSerializer    

class CSUserPlaylistViewSet(viewsets.ModelViewSet):
    queryset = CSUserPlaylist.objects.all()
    serializer_class = CSUserPlaylistSerializer    

def create_user(request,site_id):
    # pdb.set_trace()
    site = get_object_or_404(Site, pk=int(site_id))        
    u = CSUser(site=site)
    initial_videos = Video.objects.filter(site=site)[:5]
    pl = CSUserPlaylist()
    pl.save()
    for v in initial_videos:
        PlaylistVideo.objects.create(playlist=pl,video=v,similarity=0.0)
    u.playlist = pl
    u.save()
    
    return HttpResponseRedirect("/users/"+str(u.id))    

def generate_playlist(request,user_id):
    # pdb.set_trace()
    u = get_object_or_404(CSUser, pk=user_id)
    
    try: 
        p = CSUserPlaylist.objects.get(id=u.playlist.id)
        # p.delete()
    except:
        pass
    
    pl = CSUserPlaylist()
    pl.save()
    u.playlist = pl
    u.save()
    new_videos = Video.objects.all()
    new_videos = new_videos.filter(~Q(played_by=u))
    new_videos = new_videos.filter(~Q(skipped_by=u))
    count = 0
    
    rm = RecommenderManager()
    recs = rm.get_content_based_recs(u,new_videos)

    added = []
    try:
        for item in recs:
            v = item[1]
            s = item[0]
            PlaylistVideo.objects.create(playlist=pl,video=v,similarity=s)
            added.append(v)
            count = count+1
            if count is 5:
                break
    except:
        pass
                
    for v in new_videos:
        if count < 5:
            if v not in added:
                PlaylistVideo.objects.create(playlist=pl,video=v,similarity=0)
                count = count + 1
        else:
            break
        
    return HttpResponseRedirect("/playlists/"+str(pl.id)) 
        
    
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
    try:
        user.likes.add(video)
        user.save()
    except:
        pass
        
    for tag in video.tags.all():
        user.tags.add(tag)
    user.save()
    
    rm = RecommenderManager()
    recs = rm.get_content_based_recs_for_video(video,Video.objects.filter(~Q(id=video.id)))
    
    if recs != 0:
        pl = CSUserPlaylist()
        pl.save()
    
        for r in recs:
            PlaylistVideo.objects.create(video=r[1],playlist=pl,similarity=r[0])
        
        return HttpResponseRedirect("/playlists/"+str(pl.id))

    return HttpResponse("200 OK. No matches found.")
    
def skipped(request,user_id,video_id):
    user = get_object_or_404(CSUser, pk=int(user_id))
    video = get_object_or_404(Video, pk=int(video_id))
    try:
        user.skips.add(video)
        user.save()
    except:
        pass
    # for tag in video.tags.all()
    #     user.tags.remove(tag)
    return HttpResponse("200 OK")
    
def completed(request,user_id,video_id):
    user = get_object_or_404(CSUser, pk=int(user_id))
    video = get_object_or_404(Video, pk=int(video_id))
    try:
        user.completes.add(video)
        user.save()
    except:
        pass
    return HttpResponse("200 OK")
