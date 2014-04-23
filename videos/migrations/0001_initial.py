# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Site'
        db.create_table(u'videos_site', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=30)),
            ('homepage', self.gf('django.db.models.fields.URLField')(max_length=50)),
        ))
        db.send_create_signal(u'videos', ['Site'])

        # Adding model 'Video'
        db.create_table(u'videos_video', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('src', self.gf('django.db.models.fields.CharField')(unique=True, max_length=100)),
            ('title', self.gf('django.db.models.fields.CharField')(max_length=140, db_index=True)),
            ('description', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('thumb_src', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('site', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['videos.Site'], blank=True)),
        ))
        db.send_create_signal(u'videos', ['Video'])

        # Adding model 'Sitemap'
        db.create_table(u'videos_sitemap', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('url', self.gf('django.db.models.fields.URLField')(unique=True, max_length=200)),
            ('site', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['videos.Site'])),
        ))
        db.send_create_signal(u'videos', ['Sitemap'])


    def backwards(self, orm):
        # Deleting model 'Site'
        db.delete_table(u'videos_site')

        # Deleting model 'Video'
        db.delete_table(u'videos_video')

        # Deleting model 'Sitemap'
        db.delete_table(u'videos_sitemap')


    models = {
        u'videos.site': {
            'Meta': {'object_name': 'Site'},
            'homepage': ('django.db.models.fields.URLField', [], {'max_length': '50'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '30'})
        },
        u'videos.sitemap': {
            'Meta': {'object_name': 'Sitemap'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'site': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['videos.Site']"}),
            'url': ('django.db.models.fields.URLField', [], {'unique': 'True', 'max_length': '200'})
        },
        u'videos.video': {
            'Meta': {'object_name': 'Video'},
            'description': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'site': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['videos.Site']", 'blank': 'True'}),
            'src': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '100'}),
            'thumb_src': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '140', 'db_index': 'True'})
        }
    }

    complete_apps = ['videos']