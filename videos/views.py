from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.core.context_processors import csrf
from django.forms import ModelForm
from videos.models import Sitemap, Video, Site, Similarity
import urllib2
import xml.etree.ElementTree as ET
from nltk.corpus import stopwords
from nltk import word_tokenize
from django.core import serializers
stopwords = set(stopwords.words('english'))
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from djangosurface.serializers import VideoSerializer, SiteSerializer

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


class SiteViewSet(viewsets.ModelViewSet):
    queryset = Site.objects.all()
    serializer_class = SiteSerializer


class SitemapForm(ModelForm):
    class Meta: 
        model = Sitemap
        fields = ['site','url']

def add(request):    
    if request.method == 'POST':
        form = SitemapForm(request.POST)
        if form.is_valid():
            try:
                r = urllib2.urlopen(request.POST['url'])
                xml = r.read()
                sitemap = form.save()
                urlset = ET.fromstring(xml)
                videos = []
                for url in urlset:
                    video = {}
                    velem = url[1]
                    video['thumbnail_loc'] = velem[0].text 
                    video['title'] = velem[1].text
                    video['description'] = velem[2].text
                    video['content_loc'] = velem[3].text
                    videos.append(video)
                    for video in videos:
                        v = Video(src=video["content_loc"],thumb_src=video["thumbnail_loc"],title=video["title"],description=video["description"],site=sitemap.site)
                        try:
                            v.save()
                            tokens = word_tokenize(video["title"])
                            filtered_words = [w for w in tokens if not w in stopwords]
                            for w in filtered_words:
                                v.tags.add(w)
                            v.save()
                        except Exception as e:
                            pass

            except Exception as e:
                return render_to_response('../templates/error.html', {'error':e.message})
            
            return render_to_response('../templates/complete.html', {'videos':videos})
        else:
            return render_to_response('../templates/error.html', {'error':'URL has already been indexed.'})
        
    form = SitemapForm()
    c = {'form':form}
    c.update(csrf(request))
    return render_to_response('../templates/add.html', c)


def related(request,video_id):
    video = get_object_or_404(Video, pk=int(video_id))

    similarities = Similarity.objects.filter(pk1=video.id).order_by('-similarity')[:3] 
        
    if similarities.count() > 0:
        results = []
        for sim in similarities:
            try:
                similar_video = Video.objects.get(id=sim.pk2)
                results.append(similar_video)
            except:
                pass
        data = serializers.serialize("json", results)
        return HttpResponse(data)

    return HttpResponse("200 OK. No matches found.")