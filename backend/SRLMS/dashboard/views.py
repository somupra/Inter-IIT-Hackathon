from .serializers import *
from .models import *
from rest_framework import views, permissions, generics, mixins, status
from authentication.models import User
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework import status
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
from math import fabs

class PostCreate(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer

    def post(self, request, format = None):  
        print(request.FILES)    
        f = request.data.get('image')
        print(f)
        serializer = PostSerializer(data=request.data)
        print(serializer.initial_data)
        return self.create(request)

    def perform_create(self, serializer):
        print(serializer.initial_data)
        auth = self.request.user
        if auth.freeze and auth.freeze_date>datetime.datetime.now().date() and auth.contributions < settings.MIN_UNFREEZE_CONTRIB:      #Threshold is the value again set by admin
            return Response({'message': 'Your account is freezed!'}, status=status.HTTP_403_FORBIDDEN)
        else:
            if auth.freeze:
                auth.contributions = 0
                auth.freeze = False
                auth.spamcount = 0
            loc_x = serializer.initial_data.get('x_coordinate')
            loc_y = serializer.initial_data.get('y_coordinate')

            if loc_x == None:
                loc_y = 77.892101
                loc_x = 29.862286
            
            progress_report = serializer.initial_data.get('progress_report')
            token = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 6))

            # take all the markers and map the post to the most relevant one
            markers = Marker.objects.all()
            mindiff = 999999999
            nearest_marker = markers.first()
            for marker in markers:
                if abs(float(loc_x) - float(marker.x)) + abs(float(loc_y) - float(marker.y)) < mindiff:
                    nearest_marker = marker
            return serializer.save(author=auth, token=token, official=nearest_marker.location.official)


class ExtendedPostCreate(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ExtendedReportSerializer

    def post(self, request, pk, format = None):  
        serializer = ExtendedReportSerializer(data=request.data)
        print(serializer.initial_data)
        return self.create(request, pk)

    def perform_create(self, serializer):
        key = self.kwargs['pk']
        print("*********************************")
        print(key)
        parent_report = Post.objects.get(id=key)
        
        # print(serializer.initial_data)
        auth = self.request.user

        if auth.freeze and auth.freeze_date>datetime.datetime.now().date() and auth.contributions < settings.MIN_UNFREEZE_CONTRIB:      #Threshold is the value again set by admin
            return Response({'message': 'Your account is freezed!'}, status=status.HTTP_403_FORBIDDEN)
        else:
            if auth.freeze:
                auth.contributions = 0
                auth.freeze = False
                auth.spamcount = 0
            print("inside")
            token = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 6))

            return serializer.save(author=auth, parent_report=parent_report)


class Upvote(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer

    def post(self, request, format=None):
        key = request.data.get('id')
        post = Post.objects.get(id=key)
        post.upvotes += 1
        post.upvoters.add(request.user)
        post.save()
        return Response(status=status.HTTP_200_OK)


class Downvote(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer

    def post(self, request, format=None):
        key = request.data.get('id')
        post = Post.objects.get(id=key)
        post.downvotes += 1
        post.downvoters.add(request.user)
        post.save()
        return Response(status=status.HTTP_200_OK)


class FeedPostView(APIView):
    permission_classes = [IsAuthenticated]
    # serializer_class = PostSerializer

    def post(self, request, format=None):
        user = request.user
        coordinate_x = request.data.get('coordinate_x')           # Give x,y coordinates from frontend
        coordinate_y = request.data.get('coordinate_y')

        if coordinate_y == None:
            coordinate_y = 77.892101
            coordinate_x = 29.862286
        # print("jghjkljhcghjkljhfghjklkjhgffghjkl;")
        print(coordinate_x)
        print(coordinate_y)

        posts = Post.objects.all()
        precision = user.precision
        post_ids = list()

        
        for post in posts:
            diff_x = abs(coordinate_x - post.x_coordinate)
            diff_y = abs(coordinate_y - post.y_coordinate)
            
            if diff_x + diff_y < precision and user not in post.upvoters.all() and user not in post.downvoters.all() :
                
                post_ids.append(post.id)
        posts = Post.objects.filter(id__in = post_ids).order_by('-date_posted')
       
        min_list = PostSerializer(posts, many=True)

        return Response(min_list.data)

class RunAndEarn(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        user = request.user
        coordinate_x = request.data.get('coordinate_x')           # Give x,y coordinates from frontend
        coordinate_y = request.data.get('coordinate_y')

        if coordinate_y == None:
            coordinate_y = 77.892101
            coordinate_x = 29.862286
        # print("jghjkljhcghjkljhfghjklkjhgffghjkl;")
        print(coordinate_x)
        print(coordinate_y)

        markers = Marker.objects.all()
        precision = user.precision
        marker_ids = list()
        
        for marker in markers:
            diff_x = abs(coordinate_x - marker.x)
            diff_y = abs(coordinate_y - marker.y)
            
            if diff_x + diff_y < precision:
                marker_ids.append(marker.id)
        markers = Marker.objects.filter(id__in = marker_ids)
        print(marker)
        marker_list = MarkerSerializer(markers, many=True)

        return Response(marker_list.data)  




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
