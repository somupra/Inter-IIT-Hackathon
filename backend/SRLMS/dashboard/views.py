from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework import views, permissions, generics, mixins, status
from authentication.models import User
from rest_framework.response import Response
from itertools import chain
from django.http import Http404
import os
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework import authentication
from rest_framework.exceptions import APIException
from itertools import chain

class PostCreate(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


def upvote(request):
    user = request.user
    post_id = request.data.get('id')
    data = {
        'upvoted': Post.objects.filter(upvoters=user).exists()
    }
    post = Post.objects.get(id=post_id)
    if data['upvoted']:
        post.upvotes -= 1
        post.upvoters.remove(user)
        data['upvoted'] = False
        post.save()
        return JsonResponse(data)
    
    post.upvotes +=1
    post.upvoters.add(user)
    post.save()
    data['upvoted'] = True

    return JsonResponse(data)