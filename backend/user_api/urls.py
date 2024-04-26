from . import views
from django.urls import path

urlpatterns = [
    path('api/test', views.index, name = 'index'),
    path('api/login', views.user_login, name = 'login'),
    path('api/register', views.register, name = 'register'),
    path('api/logout', views.user_logout, name = 'logout'),
    path('api/42token', views.token_42, name = '42token'),
    path('api/auth42', views.authorize_42, name = 'auth42'),
    path('api/userprofile', views.user_profile,name = 'userProfile'),
]
