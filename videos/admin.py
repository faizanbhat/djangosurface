from django.contrib import admin
from videos.models import Site, Video, Sitemap, Similarity


class VideoAdmin(admin.ModelAdmin):
    fields = ['title','src']
    list_display = ('site','title', 'src')
    search_fields = ['title']
    filter_fields = ['tags']
    
admin.site.register(Site)
admin.site.register(Video, VideoAdmin)


