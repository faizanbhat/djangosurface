from django.db import models
from django.contrib.contenttypes.models import ContentType
from csusers.models import CSUser as User

import utils

class RecommenderManager(models.Manager):

    MIN_RECOMMENDATION_VALUE = 0
    MIN_SIMILARITY_VALUE = 0.25
    MIN_CONTENT_BASED_RECOMMENDATION_VALUE = 0.2
       
    def get_content_based_recs(self, user, tagged_items, min_value=MIN_CONTENT_BASED_RECOMMENDATION_VALUE):
        ''' For a given user tags and a dicc of item tags, returns the distances between the user and the items
            >>> eng=RecommenderManager()
            >>> user_tags=['a','b','c','d']
            >>> tag_matrix={}
            >>> tag_matrix['it1']=['z','a','c']
            >>> tag_matrix['it2']=['b','c']
            >>> tag_matrix['it3']=['a','r','t','v']
            >>> eng.get_content_based_recs(user_tags,tag_matrix)
            [(7.5, 'it1'), (10.0, 'it2'), (5.0, 'it3')]
        '''

        item_tag_matrix = {}
        for item in tagged_items:
            item_tag_matrix[item] = item.tags.all()
       
        user_tags = user.tags.all()
       
        recs = []
        for item,item_tags in item_tag_matrix.items():
            sim = utils.tanamoto2(item_tags, user_tags)
            if sim>=min_value:
                recs.append((sim, item))
               
        return recs

    def get_content_based_recs_for_video(self, video, tagged_items, min_value=0.20):
        ''' For a given user tags and a dicc of item tags, returns the distances between the user and the items
            >>> eng=RecommenderManager()
            >>> user_tags=['a','b','c','d']
            >>> tag_matrix={}
            >>> tag_matrix['it1']=['z','a','c']
            >>> tag_matrix['it2']=['b','c']
            >>> tag_matrix['it3']=['a','r','t','v']
            >>> eng.get_content_based_recs(user_tags,tag_matrix)
            [(7.5, 'it1'), (10.0, 'it2'), (5.0, 'it3')]
        '''

        item_tag_matrix = {}
        for item in tagged_items:
            item_tag_matrix[item] = item.tags.all()
       
        video_tags = video.tags.all()
       
        recs = []
        for item,item_tags in item_tag_matrix.items():
            sim = utils.tanamoto2(item_tags, video_tags)
            if sim>=min_value:
                recs.append((sim, item))
               
        if len(recs) > 0:
            return recs 
        else:
            return 0

