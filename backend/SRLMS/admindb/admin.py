from django.contrib import admin
from .models import *
# Register your models here.
apps = [Task, Marker, Department]
admin.site.register(apps)