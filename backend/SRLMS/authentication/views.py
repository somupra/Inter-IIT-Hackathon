from rest_framework.generics import UpdateAPIView
from .models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class ProfileUpdate(UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

class Profile(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        userdata = UserSerializer(user)
        return Response(userdata.data)