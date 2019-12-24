from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    # url(r'^gmailAuthenticate', views.gmail_authenticate, name='gmail_authenticate'),
    # url(r'^oauth2callback', views.auth_return),
    # url(r'^$', views.home, name='home'),
    path('profile-update/<int:pk>', views.ProfileUpdate.as_view()),
    path('profile', views.Profile.as_view())
]