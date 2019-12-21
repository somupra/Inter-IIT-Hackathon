from django.urls import path
<<<<<<< HEAD
from admindb import views as db_views

urlpatterns = [
    path('adminfeed-progress/', db_views.AdminListProgress.as_view()),
    path('adminfeed-complaint/', db_views.AdminListComplaint.as_view()),
]
=======
from admindb import views as admindb_views

path('markspam/', admindb_views.mark_spam )
>>>>>>> origin/hotfix
