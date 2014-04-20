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
        depth = 2
        fields = ('id','playlist','last_played')
        
class CSUserPlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSUserPlaylist
        fields = ('id','videos')