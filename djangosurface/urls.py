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
    url(r'^admin/', include(admin.site.urls)),
    url(r'^sitemap/add/', 'videos.views.add'),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^site/(?P<site_id>[0-9])/user/create/', 'csusers.views.create_user'),
    url(r'^users/(?P<user_id>[0-9]+)/played/(?P<video_id>[0-9]+)/', 'csusers.views.played'),
    url(r'^users/(?P<user_id>[0-9]+)/liked/(?P<video_id>[0-9]+)/', 'csusers.views.liked'),
    url(r'^users/(?P<user_id>[0-9]+)/skipped/(?P<video_id>[0-9]+)/', 'csusers.views.skipped'),
    url(r'^users/(?P<user_id>[0-9]+)/completed/(?P<video_id>[0-9]+)/', 'csusers.views.completed'),
    url(r'^users/(?P<user_id>[0-9]+)/playlist/', 'csusers.views.playlist'),
    url(r'^videos/(?P<video_id>[0-9]+)/related/', 'videos.views.related'),
)
