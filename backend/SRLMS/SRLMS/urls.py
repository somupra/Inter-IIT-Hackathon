from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf.urls import url
from django.contrib.auth import views as auth_views

# from allauth.account.views import confirm_email as allauthemailconfirmation


urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name = 'admindb/login.html') , name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='admindb/logout.html'), name='logout'),
    path('admindb/', include('admindb.urls')),
    path('admin/', admin.site.urls),
    path('auth/', include('rest_auth.urls')),
    path('user/', include('authentication.urls')),
    path('auth/registration/', include('rest_auth.registration.urls')),
    path('dashboard/', include('dashboard.urls')),
]


"""
Strictly for the development mode, Django will serve the files from the server for that purpose, media root will be bounded to `MEDIA_ROOT` defined in the settings. For production mode, Nginx will be used.
"""
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
