from django.urls import path
from dashboard import views as db_views


urlpatterns = [
    #posts views here 
    path('create/', db_views.PostCreate.as_view()),
    path('create/extended/<int:pk>', db_views.ExtendedPostCreate.as_view()),
    path('run-earn/', db_views.RunAndEarn.as_view()),
    path('feed/', db_views.FeedPostView.as_view()),
    # path('downvote/', db_views.downvote),
    path('upvote/', db_views.Upvote.as_view()),
    path('downvote/', db_views.Downvote.as_view()),
    path('upvoted-posts/', db_views.UpvotedPostsView.as_view()),
    path('downvoted-posts/', db_views.DownvotedPostsView.as_view()),
    path('personal-posts/', db_views.PersonalPosts.as_view()), 
]