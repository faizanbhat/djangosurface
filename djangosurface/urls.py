from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework import routers
from videos.views import SiteViewSet, VideoViewSet
from csusers.views import CSUserViewSet, CSUserPlaylistViewSet

router = routers.DefaultRouter()
router.register(r'sites', SiteViewSet)
router.register(r'videos', VideoViewSet)
router.register(r'users', CSUserViewSet)
router.register(r'playlists', CSUserPlaylistViewSet)



admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'djangosurface.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^sitemap/add/', 'videos.views.add'),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^create-user/(?P<site_id>[0-9])/', 'csusers.views.create_user'),
    url(r'^played/(?P<user_id>[0-9]+)/(?P<video_id>[0-9]+)/', 'csusers.views.played'),
    url(r'^liked/(?P<user_id>[0-9]+)/(?P<video_id>[0-9]+)/', 'csusers.views.liked'),
    url(r'^skipped/(?P<user_id>[0-9]+)/(?P<video_id>[0-9]+)/', 'csusers.views.skipped'),
)
