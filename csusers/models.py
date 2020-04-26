from django.db import models
from videos.models import Video, Site
from taggit.managers import TaggableManager
           
class CSUserPlaylist(models.Model):
    videos = models.ManyToManyField(Video, related_name="playlists", through='PlaylistVideo')

class PlaylistVideo(models.Model):
    similarity = models.FloatField()
    playlist = models.ForeignKey(CSUserPlaylist,on_delete=models.CASCADE)
    video = models.ForeignKey(Video,on_delete=models.CASCADE)

class CSUser(models.Model):
    guid = models.CharField(max_length=30,unique=True,db_index=True)
    site = models.ForeignKey(Site,on_delete=models.CASCADE)
    last_played = models.ForeignKey(Video, blank=True,null=True,on_delete=models.CASCADE)
    likes = models.ManyToManyField(Video, related_name="liked_by", blank=True, null=True)
    skips = models.ManyToManyField(Video, related_name="skipped_by", blank=True, null=True)
    plays = models.ManyToManyField(Video, related_name="played_by", blank=True, null=True)
    completes = models.ManyToManyField(Video, related_name="completed_by", blank=True, null=True)
    playlist = models.ForeignKey(CSUserPlaylist, related_name="user", blank=True, null=True, on_delete=models.CASCADE)
    tags = TaggableManager(blank=True)
    
    def __str__(self):
       return str(self.id)
