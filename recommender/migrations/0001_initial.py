# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Recommender'
        db.create_table(u'recommender_recommender', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal(u'recommender', ['Recommender'])

        # Adding model 'TestItem'
        db.create_table(u'recommender_testitem', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=200)),
        ))
        db.send_create_signal(u'recommender', ['TestItem'])


    def backwards(self, orm):
        # Deleting model 'Recommender'
        db.delete_table(u'recommender_recommender')

        # Deleting model 'TestItem'
        db.delete_table(u'recommender_testitem')


    models = {
        u'recommender.recommender': {
            'Meta': {'object_name': 'Recommender'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'recommender.testitem': {
            'Meta': {'object_name': 'TestItem'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        }
    }

    complete_apps = ['recommender']