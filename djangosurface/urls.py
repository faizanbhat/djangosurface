from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework import routers
from videos.views import SiteViewSet, VideoViewSet
from csusers.views import CSUserViewSet

router = routers.DefaultRouter()
router.register(r'sites', SiteViewSet)
router.register(r'videos', VideoViewSet)
router.register(r'users', CSUserViewSet)


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
)
