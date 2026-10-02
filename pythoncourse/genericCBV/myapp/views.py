from django.shortcuts import render

from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer

# List and Create
class ArticleListCreateView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

# Retrieve, Update, and Delete
class ArticleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

