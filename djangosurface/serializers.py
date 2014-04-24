from videos.models import Video, Site
from csusers.models import CSUser, CSUserPlaylist
from rest_framework import serializers

class SiteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Site
        fields = ('id','name', 'homepage')


class VideoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Video
        fields = ('id','src',"title","description","thumb_src","site")


class CSUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSUser
        fields = ('id','guid','last_played')
        
class CSUserPlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSUserPlaylist
        depth = 1
        fields = ('id','videos')