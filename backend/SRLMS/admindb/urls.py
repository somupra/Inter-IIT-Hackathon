from django.urls import path
from admindb import views as db_views

urlpatterns = [
    path('', db_views.welcome),
    path('adminfeed-progress-pc/', db_views.progressdashboard, name='dashboard'),
    path('adminfeed-compaint-pc/', db_views.complaintdashboard, name='dbcomplaint'),
    path('forward/<int:pk>', db_views.forward, name='verify'),
    # path('verify/<uuid:pk>', approve_success, name = 'verify'),
    path('decline/<int:pk>', db_views.decline, name = 'decline'),
    # path('spam/<uuid:pk>', mark_spam, name = 'spam'),
    # path('mark_solved/<uuid:pk>', mark_solved, name = 'solved-success'),
    # path('verified-complaints/', verified_complaints, name = 'verified-complaints'),
    # path('solved-complaints/', solved_complaints, name = 'solved-complaints'),
    #######################################################################
    path('adminfeed-progress/', db_views.AdminListProgress.as_view()),
    path('adminfeed-complaint/', db_views.AdminListComplaint.as_view()),
    path('markspam/', db_views.mark_spam),
    path('dept-list/',db_views.deplist),
    path('forward-list/',db_views.ForwardPost.as_view()),
    path('ignore-post/',db_views.IgnorePost.as_view()),
]
