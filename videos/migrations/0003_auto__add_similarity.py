# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Similarity'
        db.create_table(u'videos_similarity', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('pk1', self.gf('django.db.models.fields.IntegerField')()),
            ('pk2', self.gf('django.db.models.fields.IntegerField')()),
            ('similarity', self.gf('django.db.models.fields.FloatField')()),
        ))
        db.send_create_signal(u'videos', ['Similarity'])


    def backwards(self, orm):
        # Deleting model 'Similarity'
        db.delete_table(u'videos_similarity')


    models = {
        u'videos.similarity': {
            'Meta': {'object_name': 'Similarity'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'pk1': ('django.db.models.fields.IntegerField', [], {}),
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
            'description': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'related': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "'related_rel_+'", 'null': 'True', 'to': u"orm['videos.Video']"}),
            'site': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['videos.Site']", 'blank': 'True'}),
            'src': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '100'}),
            'thumb_src': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '140', 'db_index': 'True'})
        }
    }

    complete_apps = ['videos']