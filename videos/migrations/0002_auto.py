# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding M2M table for field related on 'Video'
        m2m_table_name = db.shorten_name(u'videos_video_related')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('from_video', models.ForeignKey(orm[u'videos.video'], null=False)),
            ('to_video', models.ForeignKey(orm[u'videos.video'], null=False))
        ))
        db.create_unique(m2m_table_name, ['from_video_id', 'to_video_id'])


    def backwards(self, orm):
        # Removing M2M table for field related on 'Video'
        db.delete_table(db.shorten_name(u'videos_video_related'))


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
            'related': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "'related_rel_+'", 'null': 'True', 'to': u"orm['videos.Video']"}),
            'site': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['videos.Site']", 'blank': 'True'}),
            'src': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '100'}),
            'thumb_src': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '140', 'db_index': 'True'})
        }
    }

    complete_apps = ['videos']