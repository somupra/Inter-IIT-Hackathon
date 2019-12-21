from django.shortcuts import render
from dashboard.models import Post
from dashboard.serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import views, permissions, generics, mixins, status
from django.http import Http404
from django.core.mail import send_mail
from .models import Department

class AdminListComplaint(generics.GenericAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, format = None):
        if not self.request.user.is_staff:
            return Response({'message': 'You do not have rights to access this page'}, status=status.HTTP_403_FORBIDDEN)
        
        posts = Post.objects.filter(official=self.request.user, progress_report=False)
        posts_list = PostSerializer(posts, many=True)  
        return Response(posts_list.data)

class AdminListProgress(generics.GenericAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, format = None):
        if not self.request.user.is_staff:
            return Response({'message': 'You do not have rights to access this page'}, status=status.HTTP_403_FORBIDDEN)
        
        posts = Post.objects.filter(official=self.request.user, progress_report=True)
        posts_list = PostSerializer(posts, many=True)  
        return Response(posts_list.data)

# action by which admin will delete the post or ignore them
class IgnorePost(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, format=None):
        try:
            post = Post.objects.get(id=pk)
        except Post.DoesNotExist:
            raise Http404
        
        post.ignored = True
        email = post.author.email
        token = post.token
        date = post.date_posted
        reason = request.data.get('reason')
        send_mail(
            'Report closed by admin action',
            'Your post with Ref. No. {0} posted on {1}, has been closed by Admin action. With the following reason: {2}'.format(token, date, reason),
            'admin@srlms.com',
            [email],
            fail_silently=False,
        )
        post.save()
        return Response({'message': 'success'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def deplist(request):
    departments = list(Department.objects.all().values())
    return JsonResponse(departments, safe=False)

class ForwardPost(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, format=None):
        try:
            post = Post.objects.get(id=pk)
        except Post.DoesNotExist:
            raise Http404

        department = request.data.get('department')
        department = Department.objects.get(name=department)
        officials = department.user_set.all()
        post.officials.remove(self.request.user)
        for official in officials:
            post.officials.add(official)
        post.save()
        return Response({'message': 'success'}, status=status.HTTP_200_OK)


