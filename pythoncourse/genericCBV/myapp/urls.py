from django.contrib import admin
from django.urls import path , include
from .views import ArticleDetailView , ArticleListCreateView 

urlpatterns = [
    path('articles/', ArticleListCreateView.as_view(), name='article-list'),
    path('articles/<int:pk>/', ArticleDetailView.as_view(), name='article-detail'),
]
