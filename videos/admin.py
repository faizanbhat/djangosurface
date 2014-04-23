from django.contrib import admin

# Register your models here.
from django.contrib import admin
from videos.models import Site, Video, Sitemap, Similarity
# Register your models here.

admin.site.register(Site)
admin.site.register(Video)
admin.site.register(Sitemap)
admin.site.register(Similarity)
