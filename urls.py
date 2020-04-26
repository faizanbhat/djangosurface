from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers
from videos.views import SiteViewSet, VideoViewSet
from csusers.views import CSUserViewSet, CSUserPlaylistViewSet
import csusers
import videos

router = routers.DefaultRouter()
router.register(r'sites', SiteViewSet)
router.register(r'videos', VideoViewSet)
router.register(r'users', CSUserViewSet)
router.register(r'playlists', CSUserPlaylistViewSet)

admin.autodiscover()

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^site/(?P<site_id>[0-9])/user/create/', csusers.views.create_user),
    url(r'^users/get', csusers.views.get_or_create_user),
    url(r'^users/(?P<user_id>[0-9]+)/played/(?P<video_id>[0-9]+)/', csusers.views.played),
    url(r'^users/(?P<user_id>[0-9]+)/liked/(?P<video_id>[0-9]+)/', csusers.views.liked),
    url(r'^users/(?P<user_id>[0-9]+)/skipped/(?P<video_id>[0-9]+)/', csusers.views.skipped),
    url(r'^users/(?P<user_id>[0-9]+)/completed/(?P<video_id>[0-9]+)/', csusers.views.completed),
    url(r'^users/(?P<user_id>[0-9]+)/playlist/', csusers.views.playlist),
    url(r'^users/(?P<user_id>[0-9]+)/refreshplaylist/', csusers.views.refresh_playlist),
    url(r'^videos/(?P<video_id>[0-9]+)/related/', videos.views.related),
    url(r'^search/', videos.views.search),
]
