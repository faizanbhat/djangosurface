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
    title = models.CharField(max_length=140, db_index=True)
    description = models.CharField(max_length=200)
    thumb_src = models.CharField(max_length=100)
    site = models.ForeignKey(Site,blank=True)
    related = models.ManyToManyField("self",blank=True,null=True)
    tags = TaggableManager()
    
    def __str__(self):
        return str(self.id)

class Similarity(models.Model):
    pk1 = models.IntegerField(db_index=True) 
    pk2 = models.IntegerField()
    similarity = models.FloatField()
      
class Sitemap(models.Model):
     url = models.URLField(max_length=200,unique=True)
     site = models.ForeignKey(Site)