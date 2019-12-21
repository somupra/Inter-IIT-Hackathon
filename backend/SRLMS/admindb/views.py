from django.shortcuts import render
# from .serializers import *
from .models import *
from rest_framework import views, permissions, generics, mixins, status
from rest_framework.response import Response
from itertools import chain
from django.http import Http404
import os
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework import authentication
from rest_framework.exceptions import APIException
from itertools import chain
import random
import string
from django.http import JsonResponse
from django.contrib import messages
import datetime
from dashboard.models import Post
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mark_spam(request):
    post_id = request.data.get("id")
    post = Post.objects.get(id = post_id)
    author = post.author

    post.spam = True
    author.spamcount += 1
    post.save()
    author.save()

    if author.spamcount >= 3:       #Limit is the limit set by admin authorities
        author.freeze = True
        author.contributions = 0
        author.freeze_date = datetime.datetime.now().date() + datetime.timedelta(days=10)                    #unfreeze after 10 days
        author.save()

    return JsonResponse(request.data)