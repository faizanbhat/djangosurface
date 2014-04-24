from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User

from recommender.managers import RecommenderManager

class Recommender(models.Model):

    objects = RecommenderManager()

class TestItem(models.Model):

    name = models.CharField(max_length=200)
    
    def __unicode__(self):
        return '%s' % self.name

