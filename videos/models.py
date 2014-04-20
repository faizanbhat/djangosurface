from django.db import models

# Create your models here.
from taggit.managers import TaggableManager

class Site(models.Model):
    name = models.CharField(max_length=30)
    homepage = models.URLField(max_length=50)
    
    def __str__(self):
        return self.name

class Video(models.Model):
    src = models.CharField(max_length=100,unique=True)
    title = models.CharField(max_length=140)
    description = models.CharField(max_length=200)
    thumb_src = models.CharField(max_length=100)
    site = models.ForeignKey(Site,blank=True)
    tags = TaggableManager()
    
    def __str__(self):
        return self.title
    
class Sitemap(models.Model):
     url = models.URLField(max_length=200,unique=True)
     site = models.ForeignKey(Site)