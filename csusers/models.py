from django.db import models
from videos.models import Video, Site
from taggit.managers import TaggableManager

# Create your models here.

           
class CSUserPlaylist(models.Model):
    plist = models.ManyToManyField(Video, related_name="queued_for", through='Order')

class Order(models.Model):
    similarity = models.FloatField()
    pl = models.ForeignKey(CSUserPlaylist)
    v = models.ForeignKey(Video)

class CSUser(models.Model):
    site = models.ForeignKey(Site)
    last_played = models.ForeignKey(Video, blank=True,null=True)
    likes = models.ManyToManyField(Video, related_name="liked_by", blank=True, null=True)
    skips = models.ManyToManyField(Video, related_name="skipped_by", blank=True, null=True)
    plays = models.ManyToManyField(Video, related_name="played_by", blank=True, null=True)
    completes = models.ManyToManyField(Video, related_name="completed_by", blank=True, null=True)
    playlist = models.ForeignKey(CSUserPlaylist, related_name="user")
    tags = TaggableManager(blank=True)
    
    def __str__(self):
       return str(self.id)
