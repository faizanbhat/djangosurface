# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'CSUserPlaylist'
        db.create_table(u'csusers_csuserplaylist', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal(u'csusers', ['CSUserPlaylist'])

        # Adding model 'PlaylistVideo'
        db.create_table(u'csusers_playlistvideo', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('similarity', self.gf('django.db.models.fields.FloatField')()),
            ('playlist', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['csusers.CSUserPlaylist'])),
            ('video', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['videos.Video'])),
        ))
        db.send_create_signal(u'csusers', ['PlaylistVideo'])

        # Adding model 'CSUser'
        db.create_table(u'csusers_csuser', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('site', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['videos.Site'])),
            ('last_played', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['videos.Video'], null=True, blank=True)),
            ('playlist', self.gf('django.db.models.fields.related.ForeignKey')(related_name='user', to=orm['csusers.CSUserPlaylist'])),
        ))
        db.send_create_signal(u'csusers', ['CSUser'])

        # Adding M2M table for field likes on 'CSUser'
        m2m_table_name = db.shorten_name(u'csusers_csuser_likes')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('csuser', models.ForeignKey(orm[u'csusers.csuser'], null=False)),
            ('video', models.ForeignKey(orm[u'videos.video'], null=False))
        ))
        db.create_unique(m2m_table_name, ['csuser_id', 'video_id'])

        # Adding M2M table for field skips on 'CSUser'
        m2m_table_name = db.shorten_name(u'csusers_csuser_skips')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('csuser', models.ForeignKey(orm[u'csusers.csuser'], null=False)),
            ('video', models.ForeignKey(orm[u'videos.video'], null=False))
        ))
        db.create_unique(m2m_table_name, ['csuser_id', 'video_id'])

        # Adding M2M table for field plays on 'CSUser'
        m2m_table_name = db.shorten_name(u'csusers_csuser_plays')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('csuser', models.ForeignKey(orm[u'csusers.csuser'], null=False)),
            ('video', models.ForeignKey(orm[u'videos.video'], null=False))
        ))
        db.create_unique(m2m_table_name, ['csuser_id', 'video_id'])

        # Adding M2M table for field completes on 'CSUser'
        m2m_table_name = db.shorten_name(u'csusers_csuser_completes')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('csuser', models.ForeignKey(orm[u'csusers.csuser'], null=False)),
            ('video', models.ForeignKey(orm[u'videos.video'], null=False))
        ))
        db.create_unique(m2m_table_name, ['csuser_id', 'video_id'])


    def backwards(self, orm):
        # Deleting model 'CSUserPlaylist'
        db.delete_table(u'csusers_csuserplaylist')

        # Deleting model 'PlaylistVideo'
        db.delete_table(u'csusers_playlistvideo')

        # Deleting model 'CSUser'
        db.delete_table(u'csusers_csuser')

        # Removing M2M table for field likes on 'CSUser'
        db.delete_table(db.shorten_name(u'csusers_csuser_likes'))

        # Removing M2M table for field skips on 'CSUser'
        db.delete_table(db.shorten_name(u'csusers_csuser_skips'))

        # Removing M2M table for field plays on 'CSUser'
        db.delete_table(db.shorten_name(u'csusers_csuser_plays'))

        # Removing M2M table for field completes on 'CSUser'
        db.delete_table(db.shorten_name(u'csusers_csuser_completes'))


    models = {
        u'csusers.csuser': {
            'Meta': {'object_name': 'CSUser'},
            'completes': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "'completed_by'", 'null': 'True', 'symmetrical': 'False', 'to': u"orm['videos.Video']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'last_played': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['videos.Video']", 'null': 'True', 'blank': 'True'}),
            'likes': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'liked_by'", 'to': u"orm['videos.Video']", 'blank': 'True', 'symmetrical': 'False', 'null': 'True', 'db_index': 'True'}),
            'playlist': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'user'", 'to': u"orm['csusers.CSUserPlaylist']"}),
            'plays': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'played_by'", 'to': u"orm['videos.Video']", 'blank': 'True', 'symmetrical': 'False', 'null': 'True', 'db_index': 'True'}),
            'site': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['videos.Site']"}),
            'skips': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'skipped_by'", 'to': u"orm['videos.Video']", 'blank': 'True', 'symmetrical': 'False', 'null': 'True', 'db_index': 'True'})
        },
        u'csusers.csuserplaylist': {
            'Meta': {'object_name': 'CSUserPlaylist'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'videos': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'playlists'", 'symmetrical': 'False', 'through': u"orm['csusers.PlaylistVideo']", 'to': u"orm['videos.Video']"})
        },
        u'csusers.playlistvideo': {
            'Meta': {'object_name': 'PlaylistVideo'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'playlist': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['csusers.CSUserPlaylist']"}),
            'similarity': ('django.db.models.fields.FloatField', [], {}),
            'video': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['videos.Video']"})
        },
        u'videos.site': {
            'Meta': {'object_name': 'Site'},
            'homepage': ('django.db.models.fields.URLField', [], {'max_length': '50'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '30'})
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

    complete_apps = ['csusers']