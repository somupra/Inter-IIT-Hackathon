from django.urls import path
from dashboard import views as db_views


urlpatterns = [
    #posts views here 
    path('create/', db_views.PostCreate.as_view()),
    path('feed/', db_views.FeedPostView.as_view()),
    path('downvote/', db_views.downvote) 
]