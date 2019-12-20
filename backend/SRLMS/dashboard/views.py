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
from rest_framework.decorators import api_view, permission_classes
from rest_framework import authentication
from rest_framework.exceptions import APIException
from itertools import chain

class PostCreate(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        auth = self.request.user
        if auth.spams < 6:
            res = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 6))
            print(res)
            serializer.save(author=auth,token=res)
        else:
            messages.info(self.request,'Too many spams to create post')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
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

@api_view(['POST',])
def downvote(request):
    user = request.user
    print(request)
    post_id = request.data.get('id')
    data = {
        'downvoted': Post.objects.filter(downvoters=user).exists()
    }
    post = Post.objects.get(id=post_id)
    if data['downvoted']:
        post.downvotes += 1
        post.author.spams -= 1
        post.author.save()
        print("yahan")
        post.downvoters.remove(user)
        data['downvoted'] = False
        post.save()
        return JsonResponse(request.data)
    
    post.downvotes -=1
    post.author.spams += 1
    post.author.save()
    post.downvoters.add(user)
    post.save()
    data['downvoted'] = True
    return JsonResponse(request.data)

class FeedPostView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        coordinates = self.request.data.get('coordinates')           # Give x,y,z coordinates from frontend
        posts = Post.objects.all()
        post_ids = list()
        print(coordinates)
        # print(coordinates.x)
        for objects in posts:
            diff_x = abs(coordinates['x'] - objects.x_coordinate)
            diff_y = abs(coordinates['y'] - objects.y_coordinate)
            if diff_x + diff_y < 1000 and user not in objects.upvoters.all() and user not in objects.downvoters.all() :
                post_ids.append(objects.id)
        return Post.objects.filter(id__in = post_ids)