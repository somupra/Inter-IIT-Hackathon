from .serializers import *
from .models import *
from rest_framework import views, permissions, generics, mixins, status
from authentication.models import User
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from django.http import Http404, HttpResponseRedirect, JsonResponse
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework import authentication
from rest_framework.permissions import IsAuthenticated
from itertools import chain
from admindb.models import Marker
import random
import string
from django.contrib import messages
import datetime

class PostCreate(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        auth = self.request.user
        
        if auth.freeze and auth.freeze_date>datetime.datetime.now().date() and auth.contributions < settings.MIN_UNFREEZE_CONTRIB:      #Threshold is the value again set by admin
            return Response({'message': 'Your account is freezed!'}, status=status.HTTP_403_FORBIDDEN)
        else:
            if auth.freeze:
                auth.contributions = 0
                auth.freeze = False
                auth.spamcount = 0

            #if auth.spamcount > 0 :
                #Send alert
                # messages.info(self.request, "Alert! Posting more spams can lead to freezing of account")


            loc_x = serializer.initial_data.get('x_coordinate')
            loc_y = serializer.initial_data.get('y_coordinate')
            progress_report = serializer.initial_data.get('progress_report')
            token = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 6))

            # take all the markers and map the post to the most relevant one
            markers = Marker.objects.all()
            mindiff = 999999999
            nearest_marker = markers.first()
            for marker in markers:
                if abs(loc_x-marker.x) + abs(loc_y-marker.y) < mindiff:
                    nearest_marker = marker
            return serializer.save(author=auth, token=token, official=nearest_marker.location.official)



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
        user.contributions -= 1
        user.save()
        return JsonResponse(data)
    
    post.upvotes +=1
    post.upvoters.add(user)
    user.contributions += 1
    post.save()
    user.save()
    data['upvoted'] = True

    return JsonResponse(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def downvote(request):
    user = request.user
    post_id = request.data.get('id')
    data = {
        'downvoted': Post.objects.filter(downvoters=user).exists()
    }
    post = Post.objects.get(id=post_id)
    if data['downvoted']:
        post.downvotes += 1
        user.contributions -= 1
        post.downvoters.remove(user)
        data['downvoted'] = False
        post.save()
        user.save()
        return JsonResponse(request.data)
    
    post.downvotes -=1
    post.downvoters.add(user)
    user.contributions += 1
    post.save()
    user.save()
    data['downvoted'] = True
    return JsonResponse(request.data)

class FeedPostView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        coordinate_x = self.request.data.get('coordinate_x')           # Give x,y coordinates from frontend
        coordinate_y = self.request.data.get('coordinate_y')
        posts = Post.objects.all()
        precision = user.precision
        post_ids = list()

        for post in posts:
            diff_x = abs(coordinate_x - post.x_coordinate)
            diff_y = abs(coordinate_y - post.y_coordinate)
            if diff_x + diff_y < precision and user not in post.upvoters.all() and user not in post.downvoters.all() :
                post_ids.append(post.id)
        return Post.objects.filter(id__in = post_ids)

class PersonalPosts(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    
    def get_queryset(self):
        user = self.request.user
        return user.authored_posts.all()

class UpvotedPostsView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    
    def get_queryset(self):
        user = self.request.user
        return user.upvoted_posts.all()


class DownvotedPostsView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    
    def get_queryset(self):
        user = self.request.user
        return user.downvoted_posts.all()
