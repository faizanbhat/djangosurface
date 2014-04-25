# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):

        # Changing field 'Video.src'
        db.alter_column(u'videos_video', 'src', self.gf('django.db.models.fields.CharField')(unique=True, max_length=300))

        # Changing field 'Video.thumb_src'
        db.alter_column(u'videos_video', 'thumb_src', self.gf('django.db.models.fields.CharField')(max_length=300))

        # Changing field 'Video.title'
        db.alter_column(u'videos_video', 'title', self.gf('django.db.models.fields.CharField')(max_length=500))

    def backwards(self, orm):

        # Changing field 'Video.src'
        db.alter_column(u'videos_video', 'src', self.gf('django.db.models.fields.CharField')(max_length=100, unique=True))

        # Changing field 'Video.thumb_src'
        db.alter_column(u'videos_video', 'thumb_src', self.gf('django.db.models.fields.CharField')(max_length=100))

        # Changing field 'Video.title'
        db.alter_column(u'videos_video', 'title', self.gf('django.db.models.fields.CharField')(max_length=140))

    models = {
        u'videos.similarity': {
            'Meta': {'object_name': 'Similarity'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'pk1': ('django.db.models.fields.IntegerField', [], {'db_index': 'True'}),
            'pk2': ('django.db.models.fields.IntegerField', [], {}),
            'similarity': ('django.db.models.fields.FloatField', [], {})
        },
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
            'description': ('django.db.models.fields.CharField', [], {'max_length': '1000'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'site': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['videos.Site']", 'blank': 'True'}),
            'src': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '300'}),
            'thumb_src': ('django.db.models.fields.CharField', [], {'max_length': '300'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '500', 'db_index': 'True'})
        }
    }

    complete_apps = ['videos']