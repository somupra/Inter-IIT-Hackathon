from django.urls import path
from admindb import views as db_views

urlpatterns = [
    path('adminfeed-progress/', db_views.AdminListProgress.as_view()),
    path('adminfeed-complaint/', db_views.AdminListComplaint.as_view()),
    path('markspam/', db_views.mark_spam )
]
