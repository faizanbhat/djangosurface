from django.core.management.base import BaseCommand, CommandError
from videos.models import Video, Similarity
from recommender.managers import RecommenderManager

class Command(BaseCommand):
    def handle(self, *args, **options):
        rm = RecommenderManager()
        videos = Video.objects.all()
        v_list = list(videos)
        total = len(v_list)
        index = 1
        while index < len(v_list):
            video = v_list[index]
            subset = v_list[:index]
            related = rm.get_content_based_recs_for_video(video,subset)
            if related != 0:
                for sim_set in related:
                    similarity = sim_set[0]
                    target = sim_set[1]
                    video.related.add(target)
                    video.save()
                    s1 = Similarity(pk1=video.id, pk2=target.id, similarity=similarity)
                    s1.save()
                    s2 = Similarity(pk1=target.id, pk2=video.id, similarity=similarity)
                    s2.save()
            index = index+1
            self.stdout.write("Completed " + str(index) + " of " + str(total),ending="\n")
    