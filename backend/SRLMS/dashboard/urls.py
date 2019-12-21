from django.urls import path
from dashboard import views as db_views


urlpatterns = [
    #posts views here 
    path('create/', db_views.PostCreate.as_view()),
    path('feed/', db_views.FeedPostView.as_view()),
    path('downvote/', db_views.downvote),
    path('upvote/', db_views.upvote),
    path('downvote/', db_views.downvote),
    path('adminfeed-progress/', db_views.AdminListProgress.as_view()),
    path('adminfeed-complaint/', db_views.AdminListComplaint.as_view()),
    path('upvoted-posts/', db_views.UpvotedPostsView.as_view()),
    path('downvoted-posts/', db_views.DownvotedPostsView.as_view()),
    path('personal-posts/', db_views.PersonalPosts.as_view()), 
]