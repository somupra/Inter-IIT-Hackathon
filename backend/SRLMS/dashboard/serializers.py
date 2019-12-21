from rest_framework import serializers, status
from rest_framework.response import Response
from .models import *

class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(allow_null=False)
    upvotes = serializers.IntegerField(read_only=True)
    downvotes = serializers.IntegerField(read_only=True)
    is_resolved = serializers.BooleanField(read_only=True)
    token = serializers.CharField(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'author', 'image', 'date_posted','description', 'upvotes', 'downvotes', 'is_resolved', 'x_coordinate', 'y_coordinate', 'token']

class ExtendedReportSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(allow_null=False)
    is_resolved = serializers.BooleanField(read_only=True)
    token = serializers.CharField(read_only=True)
    class Meta:
        model = ExtendedReport
        fields = ['id', 'author', 'image', 'date_posted','description', 'is_resolved', 'token']
