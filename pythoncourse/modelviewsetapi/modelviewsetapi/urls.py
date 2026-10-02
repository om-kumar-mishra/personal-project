from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myapp.views import PostViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
