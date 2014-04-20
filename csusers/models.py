from django.db import models
from videos.models import Video, Site

# Create your models here.

class CSUser(models.Model):
    site = models.ForeignKey(Site)
    last_played = models.ForeignKey(Video,blank=True,null=True)
    likes = models.ManyToManyField(Video, related_name="liked_by", blank=True, null=True)
    skips = models.ManyToManyField(Video, related_name="skipped_by", blank=True, null=True)
    plays = models.ManyToManyField(Video, related_name="played_by", blank=True, null=True)
    completes = models.ManyToManyField(Video, related_name="completed_by", blank=True, null=True)
    playlist = models.ManyToManyField(Video, related_name="queued_for", blank=True, null=True)
    
    def __str__(self):
       return self.guid