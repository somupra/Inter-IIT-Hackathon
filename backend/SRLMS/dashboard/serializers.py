from rest_framework import serializers, status
from rest_framework.response import Response
from .models import *
from .functions import Base64ImageField
from admindb.models import Marker

class PostSerializer(serializers.ModelSerializer):
    # image = Base64ImageField(max_length=None, use_url=True)
    author = serializers.StringRelatedField(allow_null=False)
    upvotes = serializers.IntegerField(read_only=True)
    downvotes = serializers.IntegerField(read_only=True)
    is_resolved = serializers.BooleanField(read_only=True)
    token = serializers.CharField(read_only=True)
    official = serializers.StringRelatedField()
    class Meta:
        model = Post
        fields = ['id', 'author', 'image', 'date_posted','description', 'upvotes', 'downvotes', 'is_resolved', 'x_coordinate', 'y_coordinate', 'token', 'official']

    def validate_image(self, value):
            if value == None:
                print("error")
            print(value)
            return value

class ExtendedReportSerializer(serializers.ModelSerializer):
    parent_report = serializers.StringRelatedField(allow_null=False)
    author = serializers.StringRelatedField(allow_null=False)
    is_resolved = serializers.BooleanField(read_only=True)
    class Meta:
        model = ExtendedReport
        fields = ['id', 'author', 'image', 'date_posted','description', 'is_resolved', 'parent_report']

class MarkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marker
        fields = ['x', 'y']

