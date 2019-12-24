from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    spamcount = serializers.IntegerField(read_only=True)
    contributions = serializers.IntegerField(read_only=True)
    points = serializers.IntegerField(read_only=True)
    username = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)
    class Meta:
        model = User
        fields = ['spamcount', 'precision', 'contributions', 'points', 'username', 'email', 'pk']