from django.contrib import admin

# Register your models here.
from csusers.models import CSUser, CSUserPlaylist
# Register your models here.

admin.site.register(CSUser)
admin.site.register(CSUserPlaylist)