from django.contrib import admin
from .models import *
# Register your models here.
apps = [Task, Marker]
admin.site.register(apps)