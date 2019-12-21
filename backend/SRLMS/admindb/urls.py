from django.urls import path
from admindb import views as admindb_views

path('markspam/', admindb_views.mark_spam )